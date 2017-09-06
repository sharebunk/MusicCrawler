/**
 * Created by john.nana on 4/13/2017.
 */
const req= require("request"),
    fs = require('fs');

var url = 'http://tooxclusive.com/wp-content/uploads/2017/04/Okey-I-love-Nigeria-Prod-by-Pedro.mp3.mp3';
var destination = fs.createWriteStream("./requests/test.mp3");

req(url).pipe(destination)
    .on('finish',()=>{ console.log(`${url} completed successfully`)})
    .on("close",()=> {console.log(`${url} stream closed`)});





