#!/usr/bin/env node 

let fs = require("fs")
let path = require("path")
let markdownLinkExtractor = require('markdown-link-extractor');
let fetch = require('node-fetch')
let chalk = require('chalk')
let argumentsUser = process.argv[2]


const mdLinks= {}



mdLinks.readDirectory = (argumentsUser) => {
  return new Promise((resolve, reject) => {
    fs.lstat(argumentsUser, (err, stats) => {

      if (err) {
        return reject(err);
      }
      if (stats.isDirectory() === true) {
        return fs.readdir(argumentsUser, (err, itemList) => {
          if (err) {
            return reject(err);
          }

          let holi = itemList.map((item) => path.resolve(argumentsUser, item))

          const res = holi.map(element => {
            const prom = mdLinks.readDirectory(element);
            //console.log(prom);
            return prom;
          });

          Promise.all(res).then(resolve).catch(error => {
            console.log(error.message);
            console.error(error.stack)
        });
        });

      }else if(stats.isFile() === true) {
        return resolve(argumentsUser)
      }else{
        resolve([]);
      }
    })

  })

}

mdLinks.fileExtractor =(arr) =>{
  return new Promise((resolve, reject) => {    
       let hello = arr.toString().split(',')
       let file =hello.filter( element => {
       return element !== ""
       });
       let file2 = file.filter(element => {
         if(path.extname(element)===".md"){
           return element
         }          
       })
       return resolve(file2)  
       
    })
}

mdLinks.readfile = (file) => {
 // console.log(file)
return new Promise ((resolve, reject)=>{
  fs.readFile(file, function(error , buf){ // LEE EL ARCHIVO
    let linkArr = []
    if (error){
        return reject(error)
    }
      let lineFile = buf.toString().split('\n')
      
      for(i=0; i<lineFile.length; i++){
       let links = markdownLinkExtractor( lineFile[i])
       
       if(links.length > 0){         
        for (a=0; a<links.length; a++){
           linkArr.push({
             file: file,
             line: i+1,
             url: links[a],
             text: links[a].text, 
           })
         }       
       }
      }          
    return resolve(linkArr)
  })
 })
}

mdLinks.validation = (linkArr) => {
  
 return new Promise ((resolve, reject)=>{   
    if(linkArr.url.substring(0,4) === 'http') {         
     fetch(linkArr.url)
      .then( data => {
          if(data.status === 200){
            return resolve ({...linkArr, validate : 'OK'})
          }else if (data.status !== 200){
            return resolve ({...linkArr, validate :'URL INVALIDA'})
          }else{
            return resolve ({...linkArr, validate : 'NO CORRESPONDE A URL VALIDA'})
          }        
      })
      .catch(error =>{
          return resolve({...linkArr, validate :'NO CORRESPONDE A URL VALIDA'})
      }) 
    }else{
      return resolve ({...linkArr, validate :'NO CORRESPONDE A URL'})
    }
  })
  }


// Se ejecutan las promesas  exportable)

const mdLinksFinal = (argumentsUser) => {
return new Promise ((resolve, reject)=>{   
mdLinks.readDirectory(argumentsUser)
  .then(data => {
    console.log('Cargando...')
    return mdLinks.fileExtractor(data) 
  })
  .then(data1=>{
    return data1.map(element =>{
      return mdLinks.readfile(element) 
    })    
  })
  .then(data2=>{
    return Promise.all(data2)
  })
  .then(data3=>{
    let arreglo = [];
    for (let i=0; i<data3.length; i++){
        arreglo.push( data3[i].filter(element=>{
          return element !== []
        }))
    }
   return arreglo.reduce((acc,current)=>{
     return acc.concat(current)
   })
  })
  .then(data4=>{
    return data4.map(element =>{
      return mdLinks.validation(element) 
    }) 
  })
  .then(data5=>{
      return resolve( Promise.all(data5) )
      
  }).catch(error => {
    console.log(error.message);
    console.error(error.stack)
  })
})
}

mdLinks.print = (link) =>{
  for(let i=0; i<link.length; i++){  
    console.log(chalk.magenta(link[i].file), chalk.green(link[i].line), chalk.cyan(link[i].url), chalk.blue(link[i].validate))
  }
}
mdLinks.printStats = (link) =>{
  
  let totalLinks = link.length;
  let linksOk = link.filter(element=>{
    return element.validate ==="OK"
  }).length;
  let linksFail = totalLinks - linksOk;

  console.log(chalk.magenta('Total Links:',totalLinks,'\n','Links Ok:',linksOk,'\n','Broken Links:',linksFail))
  
}

if(require.main === module){
  let arrOption = [];
  let titanic;
    
   for(let i=2; i<process.argv.length; i++){
     if( process.argv[i].indexOf('--') == 0){
        arrOption.push(process.argv[i])
     }else{
        titanic = process.argv[i]
     }
   }
 // console.log(arrOption)
   mdLinksFinal(titanic)
   .then(data =>{
     if( arrOption.indexOf('--validate') != -1){
        mdLinks.print(data)
     }
     if (arrOption.indexOf('--stats') !== -1){
        mdLinks.printStats(data)
     }
   })
    
}








module.exports = mdLinksFinal