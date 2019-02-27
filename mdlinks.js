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


let fetch = require('node-fetch')

fetch('https://otra-cosa.net/algun-doc.html')
.then(data=>{
    console.log(data)
})