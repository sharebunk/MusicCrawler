/**
 * Created by john.nana on 4/6/2017.
 */
var cheerio = require('cheerio'),
    fs=require("fs"),
    _ = require("lodash"),
    Promise = require('bluebird'),
    download = require('download'),
    rp = require('request-promise'),

    fs = require("fs");

const URL = require('url'),
    path = require('path');
Promise.promisifyAll(fs);




/*uri: 'http://tooxclusive.com/download-mp3/',*/
const BaseURL = 'http://tooxclusive.com/download-mp3/';
const myURL = URL.resolve('http://tooxclusive.com/', 'download-mp3/');

var destination = "downloads";





function rpOptions(url) {
    return {
        uri: url,
        transform: function (body) {
            return cheerio.load(body);
        }
    }
}//end rpOption

var options1 = rpOptions(BaseURL);


function downloadMP3(url, folderpath){

        var filename= url.substr(url.lastIndexOf("/")+1);
        var downloadPath = path.join(folderpath,filename);
        console.log("### downloading "+ filename+"....");
       /* download(url).pipe(fs.createWriteStream(downloadPath))*/

        download(url).then((data) => {
            fs.writeFileSync(downloadPath, data);
           // const dumpPath = `${familyDump}/${fontStyle}.ttf`;
            var msg = ` ${filename} downloaded successfully.`;

            console.log(msg)
        }).catch(function (err) {
                // Crawling failed or Cheerio choked...
            console.log(err.message)
            });


        //console.log("### successfully downloaded "+ filename+"....");
    }




rp(options1)
    .then(function ($) {
        // Process html like you would with jQuery...
        //trends
        console.log("####crawling post page###");
        var songs = [];
        var links = $("a.post-thumb");
        $(links).each(function(i, link){
            var DL = $(link).attr('href');
           // console.log(songpage);
            if (DL!="" | DL!=null){

                var options2 = rpOptions(DL);
                //crawl download page
                rp(options2).then($$=>{
                    console.log("####crawling download page###");
                    var link = $$("audio a").text();
                    if(link != "" | link !=null){
                        console.log(link);
                          downloadMP3(link, destination);
                    }


                });//

            } //endIF

        });//endEach


    })
    .catch(function (err) {
        // Crawling failed or Cheerio choked...
    });


