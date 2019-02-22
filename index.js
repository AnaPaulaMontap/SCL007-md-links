/*module.exports = () => {
  
};

*/

let fs = require("fs")
let path = require("path")
let markdownLinkExtractor = require('markdown-link-extractor');
let http = require('https')
let file = process.argv[2]
let linkArr = []



const mdLinks = (file) => {

fs.readFile(file, function(error , buf){ // LEE EL ARCHIVO
    if (error){
        console.error(error)
    }
    if(path.extname(file) ===  ".md") {
      linkArr = markdownLinkExtractor(buf.toString()); // TRANSFORMA EL BUFFER EN STRING Y EXTRAE LOS LINKS
     // links.forEach(function (link) { // RECORRE LOS LINK Y LOS EXTRAE      
     //console.log(linkArr);
     validation(linkArr)
    }
    
  })
}

const validation = (linkArr) =>{  

  let url = linkArr[0]
  http.get(url, function(response){
    if(response.statusCode === 200){
      console.log(url,'status ok')
    }
    response.on('error', function(error){
       console.error(error)
    })
}) 
}

  mdLinks(file)
  