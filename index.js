#!/usr/bin/env node 
//module.exports = mdLinks


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

          Promise.all(res).then(resolve).catch(console.error);
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
return new Promise ((resolve, reject)=>{
  fs.readFile(file, function(error , buf){ // LEE EL ARCHIVO
    let linkArr = []
    if (error){
        return reject(error)
    }
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
    return resolve(linkArr)
  })
 
 })
}

mdLinks.validation = (linkArr) => {
  return new Promise ((resolve, reject)=>{
    let raquel = linkArr
     //console.log(linkArr)
   // raquel.forEach((link) => { 
   for (let i = 0; i< raquel.length; i++){  
        //console.log(raquel[i].url)
   if(raquel[i].url.substring(0,4) === 'http'){
     fetch(raquel[i].url)
      .then( data => {
          if(data.status=== 200){
            return resolve (raquel[i].validate = 'OK')
          }else if ((data.status !== 200)){
            return resolve (raquel[i].validate = 'URL INVALIDA')
          }else{
            return resolve (raquel[i].validate = 'NO CORRESPONDE A URL')
          }
      })
      .catch(error =>{
          return reject(raquel[i].validate = 'URL INVALIDA')
      })
    }else{
      return resolve (raquel[i].validate = 'NO CORRESPONDE A URL')
    } 
    }
})
}



mdLinks.readDirectory(argumentsUser)
  .then(data => {
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
    return data3.filter( element => {
      return element !== []
      });
  })
  .then(data4 =>{    
    return data4.map(element =>{
      return mdLinks.validation(element) 
    }) 
  })
  .then(data5=>{
    return data5.filter( element => {
      return element !== []
      });
  })
  .then(data6=>{
    //console.log(data5)
    return Promise.all(data6)
  })
  .then(data7=>{
    console.log(data8)
  })
  
  



/*
         /*
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
    } else if(raquel[i].url.substring(0, 4) == 'http'){
      http.get(raquel[i].url, (response) => {
        if (response.statusCode === 200) {
          //console.log('linea:'+link.line +' '+'url:'+ link.url +' '+ chalk.green (`Status: OK`))
          raquel[i].validate = 'OK'
        }
        
      }).on('error', (e) => {
        //console.log( link.line +' '+ link.url +' '+ chalk.red(`Error: ${e.message}`));
        raquel[i].validate = 'ERROR'
      })
    }else{
      raquel[i].validate = 'null'
    }
   
  //}  
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
