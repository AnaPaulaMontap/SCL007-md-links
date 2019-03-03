const mdlinks = require('./index.js').mdlinks

mdlinks('./README-lab.md')
.then(data =>{
    console.log(data)
}).catch(error => {
    console.log(error.message);
    console.error(error.stack)
})









/*
let fs = require("fs")
let path = require("path")
let markdownLinkExtractor = require('markdown-link-extractor');
let https = require('https')
let http = require('http')
let chalk = require('chalk')
let argumentsUser = process.argv[2]

let file=[]
function mdlinks (argumentsUser){
return new Promise((resolver, rechazar) => { 
    fs.lstat(argumentsUser, (err, stats) => { 
        if (err) {
            return rechazar(err);
          }
        if(stats.isDirectory() === true){
            fs.readdir(argumentsUser,(err,itemList) => {
                if (err) {
                  return rechazar(err);
                } 
                return resolver(itemList)
            })
        }         
    })    
})
}

mdlinks(argumentsUser)
.then(data => {       
    let hola= data.map((item) => path.resolve(argumentsUser,item))
    return hola
})
.then (data2 =>{
   return data2.map(element => {
       return mdlinks(element)
   }) 
})
.then (data3=>{
    data3[8].then(console.log);
   return Promise.all(data3);
})
.then(res => {
    console.log(">>>"+res);
}).catch(err => {
    console.error(err);
});



*/



  
  /*
  .then(data3=>{
    return data3.map(element =>{
      return mdLinks.validation(element) 
    }) 
  })
  .then(data4=>{
    
   return data4.filter(element =>{
     return element !== undefined
   })
  })
  .then(data5 =>{
    console.log(data5)
  })


*/
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

/*
mdLinks.urlExtractor=(linkArr)=>{
return new Promise ((resolve, reject)=>{  
  
 let pruebaurl= linkArr.map(element =>{
    return element.url
  })

  for(i=0; i<pruebaurl.length; i++){
   if(pruebaurl[i].substring(0,4) !== 'http' ){
     return resolve (pruebaurl[i].validate = pruebaurl[i] +"/"+ 'NO CORRESPONDE A URL')
   }
   else{
    return resolve(pruebaurl[i])
   }   
  }//return reject(pruebaurl[i]='error')
})
} */