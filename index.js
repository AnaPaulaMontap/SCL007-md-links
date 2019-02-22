/*module.exports = () => {
  
};

*/

let fs = require("fs")
let path = require("path")
let markdownLinkExtractor = require('markdown-link-extractor');
let https = require('https')
let http = require('http')
let chalk = require('chalk')
let file = process.argv[2]
let linkArr = []



const mdLinks = (file) => {

fs.readFile(file, function(error , buf){  // LEE EL ARCHIVO
    
    if (error){
        console.error(error)
    }
    if(path.extname(file) ===  ".md") {
      let lineFile = buf.toString().split('\n')
      for(i=0; i<lineFile.length; i++){
       let links = markdownLinkExtractor( lineFile[i])
       
       if(links.length >0){
        // console.log(links)
        for (a=0; a<links.length; a++){
           linkArr.push({
             line: i+1,
             url: links[a], 
           })
         }       
       }
      }   
     
     console.log(`Existen ${linkArr.length} links en este documento`) 
      validation(linkArr) 
    }
    
  })
}

const validation = (linkArr) => {
 
  linkArr.forEach((link) => {
    if (link.url.substring(0, 5) == 'https') {
      https.get(link.url, (response) => {

        if (response.statusCode === 200) {
          console.log(link.line +' '+ link.url +' '+ chalk.green (`OK`))
        }
      }).on('error', (e) => {
        console.error(link.line +' '+ link.url +' '+ chalk.red(`Error: ${e.message}`));
      })
    } else {
      http.get(link.url, (response) => {
        if (response.statusCode === 200) {
          console.log(link.line +' '+ link.url +' '+ chalk.green(`OK`))
        }
        
      }).on('error', (e) => {
        console.error( link.line +' '+ link.url +' '+ chalk.red(`Error: ${e.message}`));
      })
    }
  })

}

  mdLinks(file)
  