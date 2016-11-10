import request from 'request';
import FeedParser from 'feedparser';

export default function updateRss(url, callback) {
    let req = request(url);
    let feedparser = new FeedParser([]);
    
    req.on('response', function (res) {
        let stream = this;
        stream.pipe(feedparser);
    })
    
    let count = 0;
    feedparser
        .on('error', function(error) {
                console.log("FEED PARSER ERROR", error);
            })
        .on('readable', function() {
            let stream = this
                , meta = this.meta
                , item;
            
            while(item = stream.read()) {
                count = count+1;
                callback(item);
            }
        });
}