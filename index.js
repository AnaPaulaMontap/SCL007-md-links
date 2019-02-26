#!/usr/bin/env node 
//module.exports = mdLinks


let fs = require("fs")
let path = require("path")
let markdownLinkExtractor = require('markdown-link-extractor');
let https = require('https')
let http = require('http')
let chalk = require('chalk')
let argumentsUser = process.argv[2]


const mdLinks= {}



mdLinks.readDirectory = (argumentsUser) => { 
  let files =[]
 return new Promise  ((resolve, reject)=>{
  fs.lstat(argumentsUser, (err, stats) => { 
    
    if (err) {
      return console.error(reject);
    }
    if(stats.isDirectory() === true) {     
      fs.readdir(argumentsUser,(err,itemList) => {
        if (err) {
          return console.error(err.message);
        }

        let holi = itemList.map((item) => path.resolve(argumentsUser,item))
        
       holi.forEach(element => {
        resolve(element)
          // mdLinks.readDirectory(element)
        });
      }); 
 
} 
})
})
}

mdLinks.readDirectory(argumentsUser)
.then(data =>{
 console.log(data)
})
  

mdLinks.readfile = (file) => {
return new Promise ((resolve, reject)=>{
  fs.readFile(file, function(error , buf){ // LEE EL ARCHIVO
    let linkArr = []
    if (error){
        return reject(error)
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
     
     //console.log('Existen' +' '+ chalk.magenta(linkArr.length + 'links')+ ' '+'en este documento') 
    //validation(linkArr) 
    }
    return resolve(linkArr)
  })
 })
}


mdLinks.validation = (linkArr) => {
  return new Promise ((resolve, reject)=>{
    let raquel = linkArr 

   // raquel.forEach((link) => { 
     for (let i = 0; i< raquel.length; i++){  
         //console.log(raquel[i].url)
    if (raquel[i].url.substring(0, 5) == 'https') {
      https.get(raquel[i].url, (response) => {
      //console.log(raquel[i].url)
        if (response.statusCode === 200) {
          
          //console.log('linea:'+raquel.line +' '+'url:'+ link.url +' '+ chalk.green (`Status: OK`))
           raquel[i].validate = 'OK'
           //console.log(raquel[i].validate)
        }
      }).on('error', (e) => {
        //console.log(link.line +' '+ link.url +' '+ chalk.red(`Error: ${e.message}`)
        raquel[i].validate = 'ERROR'
        
      
      })
    } else {
      http.get(raquel[i].url, (response) => {
        if (response.statusCode === 200) {
          //console.log('linea:'+link.line +' '+'url:'+ link.url +' '+ chalk.green (`Status: OK`))
          raquel[i].validate = 'OK'
        }
        
      }).on('error', (e) => {
        //console.log( link.line +' '+ link.url +' '+ chalk.red(`Error: ${e.message}`));
        raquel[i].validate = 'ERROR'
      })
    }
  }
  return resolve(raquel)
})
}



/*
.then (dataVerify =>{
 mdLinks.validation(dataVerify)
})
.then(dataResult =>{
  console.log(dataResult)
})
.catch(error =>{
  console.error (error.message)
})
*/
