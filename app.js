/**
 * Created by john.nana on 4/6/2017.
 */
var cheerio = require('cheerio'),
    fs=require("fs"),
    _ = require("lodash"),
    Promise = require('bluebird'),
    rp = require('request-promise'),

    fs = require("fs");
Promise.promisifyAll(fs);



/*uri: 'http://tooxclusive.com/download-mp3/',*/
var BaseURL= 'http://tooxclusive.com/download-mp3/';

function rpOptions(url) {
    return {
        uri: url,
        transform: function (body) {
            return cheerio.load(body);
        }
    }
}//end rpOption

var options1 = rpOptions(BaseURL);





rp(options1)
    .then(function ($) {
        // Process html like you would with jQuery...
        //trends
        console.log("####crawling post page###");
        var songs = [];
        var links = $("a.post-thumb");
        $(links).each(function(i, link){
            var songpage = $(link).attr('href');
           // console.log(songpage);
            var options2 = rpOptions(songpage);
            //crawl download page
            rp(options2).then($$=>{
                console.log("####crawling download page###");
                var link = $$("audio a").text();
                console.log(link);
                //songs.push(link);

            });//
           // console.log(songs);

        });//endEach


    })
    .catch(function (err) {
        // Crawling failed or Cheerio choked...
    });
/*function getPost(){
    return rpOptions(options1);
}

function getSong(){

}*/

function Crawler(){


}

