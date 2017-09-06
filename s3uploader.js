/**
 * Created by john.nana on 4/6/2017.
 */
require('dotenv').config()
var fs = require("fs")
var S3FS = require('s3fs');
var keyID = process.env.S3KEY;
var access= process.env.S3ACCESS;
var options= {accessKeyId:keyID,
                secretAccessKey:access,
                signatureVersion: 'v4'}

var fsImpl = new S3FS('bnicebucket', options);

var stream = fs.createReadStream("downloads/Ebola_mxd_4_m.mp3");

/*fsImpl.writeFile('Ebola.mp3', stream).then(function() {
    console.log('It\'s saved!');
}, function(reason) {
    throw reason;
});*/

const req= require("request");
   /* fs = require('fs');*/

var url = 'http://tooxclusive.com/wp-content/uploads/2017/04/Okey-I-love-Nigeria-Prod-by-Pedro.mp3.mp3';
var destination = fs.createWriteStream("./requests/test.mp3");
var dest = fsImpl.createWriteStream('oboro.mp3');

req(url).pipe(dest)
    .on("open",()=> {console.log(`${url} stream opened`)})
    .on('finish',()=>{ console.log(`${url} completed successfully`)})
    .on("close",()=> {console.log(`${url} stream closed`)});