let fs = require("fs")
let path = require("path")
let markdownLinkExtractor = require('markdown-link-extractor');
let https = require('https')
let http = require('http')
let chalk = require('chalk')
let argumentsUser = process.argv[2]


function mdlinks (argumentsUser){
new Promise((resolver, rechazar) => { 
    fs.lstat(argumentsUser, (err, stats) => { 
        if (err) {
            return console.error(rechazar);
          }
        if(stats.isDirectory() === true){
            fs.readdir(argumentsUser,(err,itemList) => {
                if (err) {
                  return console.error(err.message);
                } resolver(itemList)
            })
        }         
    })    
})
.then(data => {       
    let hola= data.map((item) => path.resolve(argumentsUser,item))
    return hola
})
.then (data2 =>{
   data2.forEach(element => {
       return mdlinks(element)
   })
   let string = data2.toString()
    return string
    
})
.then(data3 =>{
    console.log(data3)
})
}

mdlinks(argumentsUser)