import YouTube from 'youtube-api';
import fs from 'fs';
import {BASEDIR, File} from '../api/files';
import readJson from 'r-json';
import Lien from 'lien';
import opn from 'opn';
import prettyBytes from 'pretty-bytes';

const CREDENTIALS = readJson(`${BASEDIR}/imports/data/credentials.json`);

export const youtubeUploader = function(filePath) {
    let server = new Lien({
        host: 'localhost',
        port: 5000,
        });

    console.log("Starting lien server at port 5000, with upload file " + filePath);
    
    let oauth = YouTube.authenticate({
        type: 'oauth',
        client_id: CREDENTIALS.web.client_id,
        client_secret: CREDENTIALS.web.client_secret,
        redirect_url: CREDENTIALS.web.redirect_uris[0],
    });

    opn(oauth.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/youtube.upload']
    }));
    
    server.addPage('/', lien => {
        lien.end('Hello, there!');
    })

    server.addPage('/samples/oauth2/oauth2callback', lien => {
        Logger.log('Trying to get the token using the following code: ' + lien.query.code);
        oauth.getToken(lien.query.code, (err, tokens) => {
            if (err) {
                lien.lien(err, 400);
                return Logger.log(err);
            }
            
            Logger.log('Got the token.');
            oauth.setCredentials(tokens);
            lien.end('The video is being uploaded. Check out the logs in the terminal.');
            
            var req = Youtube.videos.insert({
                snippet: {
                    title: 'Testing YouTube API NodeJS module',
                    description: 'Test video upload via YouTube API',
                },
                status: {
                    privacyStatus: 'private',
                },
                part: 'snippet, status',
                media: {
                    body: fs.createReadStream(filePath)
                }
            }, (err, data) => {
                console.log('Done.');
                //process.exit();
            });
            
            setInterval(function() {
                Logger.log(`${prettyBytes(req.req.connection._bytesDispatched)} bytes uploaded`);
            }, 250);
        });
    });
}

youtubeUploader('C:\\thach\\dev\\web\\vietweekly.16.0\\.meteor\\private\\data\\haKzsZsCXFpvBg3zq.mp4');

/*
let server = new Lien({
    host: 'localhost',
    port: 5000,
});

let oauth = YouTube.authenticate({
    type: 'oauth',
    client_id: CREDENTIALS.web.client_id,
    client_secret: CREDENTIALS.web.client_secret,
    redirect_url: CREDENTIALS.web.redirect_uris[0],
});

opn(oauth.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/youtube.upload']
}));

server.addPage('/samples/oauth2/oauth2callback', lien => {
    Logger.log('Trying to get the token using the following code: ' + lien.query.code);
    oauth.getToken(lien.query.code, (err, tokens) => {
        if (err) {
            lien.lien(err, 400);
            return Logger.log(err);
        }
        
        Logger.log('Got the token.');
        oauth.setCredentials(tokens);
        lien.end('The video is being uploaded. Check out the logs in the terminal.');
        
        var req = Youtube.videos.insert({
            snippet: {
                title: 'Testing YouTube API NodeJS module',
                description: 'Test video upload via YouTube API',
            },
            status: {
                privacyStatus: 'private',
            },
            part: 'snippet, status',
            media: {
                body: fs.createReadStream(BASEDIR + '/.meteor/private/data/' + file.name)
            }
        }, (err, data) => {
            console.log('Done.');
            process.exit();
        });
        
        setInterval(function() {
            Logger.log(`${prettyBytes(req.req.connection._bytesDispatched)} bytes uploaded`);
        }, 250);
    });
});
*/