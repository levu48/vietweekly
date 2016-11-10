import {Meteor} from 'meteor/meteor';
import htmlparser from 'htmlparser';
import {updateRss} from '../utils';
import {Posts} from './posts';
import url from 'url';

function getDescriptionAndImage(hostname, dom) {
    let description = '';
    let image = '';
    
    if (hostname === 'vnexpress.net' || hostname === 'dantri.com.vn') {
        let textObj = dom.find((obj) => obj.type === 'text');
        description = textObj ? textObj.data : '';
        
        let aTag = dom.find((obj) => obj.type === 'tag' && obj.name === 'a');
        let imageObj = aTag.children.find((obj) => obj.type === 'tag' && obj.name === 'img');
        //console.log("*** IMAGE OBJ", imageObj);
        
        image = imageObj ? imageObj.attribs.src : ''; 
    
    } else if (hostname === 'vietnamnet.vn' || 'rss.upi.com') {
        let textObj = dom.find((obj) => obj.type === 'text');
        description = textObj ? textObj.data : '';
        
        let imageObj = dom.find((obj) => obj.type === 'tag' && obj.name === 'img');
        //console.log("*** IMAGE OBJ", imageObj);
        
        image = imageObj ? imageObj.attribs.src : '';
        
    } else if (hostname === 'www.yahoo.com') {
        let textObj = dom.find((obj) => obj.type === 'text');
        description = textObj ? textObj.data : '';
        
        let pTag = dom.find((obj) => obj.type === 'tag' && obj.name === 'p');
        let aTag = pTag.children.find((obj) => obj.type === 'tag' && obj.name === 'a');
        let imageObj = aTag.children.find((obj) => obj.type === 'tag' && obj.name === 'img');
        console.log("*** IMAGE OBJ", imageObj);
        
        image = imageObj ? imageObj.attribs.src : ''; 
         
    } else {
        let textObj = dom.find((obj) => obj.type === 'text');
        description = textObj ? textObj.data : '';        
    }
    
    return {
        text: description,
        image: image
    } 
}

if (Meteor.isServer)  {
    Meteor.methods({
        'rss.update'(urlAddress, tags) {
            updateRss(urlAddress, Meteor.bindEnvironment((obj) => {
                const sourceURL = url.parse(urlAddress);

                let handler = new htmlparser.DefaultHandler((error, dom) => {
                    if (error) {
                        console.log("ERROR", error);
                        return;
                    } 
                });
                
                let parser = new htmlparser.Parser(handler);
                parser.parseComplete(obj.description);
                
                

                let obj2 = getDescriptionAndImage(sourceURL.hostname, handler.dom);    
                
               
                
                if (sourceURL.hostname === 'www.theguardian.com') {
                    obj2.image = obj['media:content'][0]['@'].url;
                    if (!tags) tags = ['rss', 'english', 'wsj'];
                    
                } else if (sourceURL.hostname === 'www.wsj.com') {
                    console.log("WALL STREET", obj['media:content']);
                    obj2.image = obj['media:content']['@'].url;
                    if (!tags) tags = ['rss', 'english', 'theguardian'];
                    console.log("WALL STREET JOURNAL", obj['media:content'], obj2.image);
                
                } else if (sourceURL.hostname === 'feeds.bbci.co.uk') {
                    obj2.image = obj.image.url;
                    if (!tags) tags = ['rss', 'english', 'bbc'];
                    
                } else if (sourceURL.hostname === 'sputniknews.com') {
                    obj2.image = obj.enclosures[0].url;
                    if (!tags) tags = ['rss', 'english', 'sputnik'];
                
                } else if (sourceURL.hostname === 'www.aljazeera.com') {
                    obj2.image = obj.image.url;
                    if (!tags) tags = ['rss', 'english', 'aljazeera'];
                    
                } else {
                    if (!tags) tags = ['news', 'rss'];
                }     
                
                

                let post = {
                    title: obj.title,
                    subtitle: obj2.text,
                    text: '',
                    images: [obj2.image],
                    videos: [],
                    author: 'admin',
                    source: {
                        name: obj.meta.title,
                        link: obj.link,
                        type: 'external',
                    },
                    tags: tags,
                    hidden: false,
                    
                    createdAt: new Date(),
                    createdBy: 'admin',
                    approvedAt: new Date(),
                    approvedBy: 'admin',
                    updatedAt: new Date(),
                    updatedBy: 'admin',
                    
                    views: 0,
                    rating: 0,
                    ratingCount: 0,
                    commentsCount: 0,
                
                    extras: {
                        style: {},
                        partition: [1,3],
                        orientation: 'vertical',
                        mode: 'image',
                        heightFactor: 1,
                    }
                }

                /*
                if (obj.link && obj.link !== '') {
                    let query = {'source.link': obj.link};
                    Posts.update(query, post, {upsert: true});
                } else {
                    Posts.insert(post);
                }
                */
                if (obj.link && obj.link !== '') {
                    let query = {'source.link': obj.link};
                    if (!Posts.findOne(query)) {
                        Posts.insert(post);
                    }
                }
                
            }));
        }
    });
}