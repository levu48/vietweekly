import {Meteor} from 'meteor/meteor';
import http from 'http';
import fs from 'fs';
import path from 'path';
import google from '../utils/google';
import {youtubeUploader} from '../utils/youtube';
import {Resources} from './resources';
import {Posts} from './posts';

if (Meteor.isServer) {
    
    Meteor.methods({      
        youtubeUpload(filePath) {
            console.log(`Start uploading file ${filePath} to YouTube ...`);
            try {
                youtubeUploader(filePath);
            } catch(e) {
                console.log("ERROR YOUTUBE UPLOAD", e);
            }
        },
        
        searchGoogle(text) {
            const comp = Posts.findOne({title: text});
            let resources = null;
            if (comp) {
                resources = Resources.find({postId: comp._id}).fetch();
            }
            
            if (resources && resources.length > 0) {
                return resources;
            }
    
            google.resultsPerPage = 50;
            let nextCounter = 0;
            let result =  Meteor.wrapAsync(google)(text);
            
            
            if (comp && result && result.links && result.links.length > 0) {
                result.links.forEach((link) => {
                    let obj = {
                        postId: comp._id,
                        title: link.title,
                        link: link.href || '',
                    }                    
                    Meteor.call('resources.insert', obj);
                });
            }
            return result.links;
        },
        
        searchGoogle2(text) {
            google.resultsPerPage = 25;
            let nextCounter = 0;
            google(text, function (err, res){
                if (err) console.error(err)
                console.log("SEARCH RESULT", res);
                
                for (var i = 0; i < res.links.length; ++i) {
                    var link = res.links[i];
                    console.log(link.title + ' - ' + link.href)
                    console.log(link.description + "\n")
                }

                if (nextCounter < 4) {
                    nextCounter += 1
                    if (res.next) res.next()
                }
            });
            
            return {};
        },
        
        readRss(url) {
            http.get(url, (res) => {
                console.log('GOT RESPONSE');
            }).on('error', (e) => {
                console.log('GOT ERROR', e.message);
            });
        },
        
        writeSpecialPosts(arr) {
            let text = JSON.stringify(arr);
            let base = path.resolve('.').split('.meteor')[0];
            fs.writeFile(base + '/imports/data/specialPosts.json', text, 'utf-8');
        },
        
        readSpecialPosts2() {
            let base = path.resolve('.').split('.meteor')[0];
            let text = fs.readFileSync(base + '/imports/data/specialPosts.json', 'utf-8');
            console.log("READ SPECIAL POSTS", text);
            let obj = JSON.parse(text);
            return obj;
        }
    })
}