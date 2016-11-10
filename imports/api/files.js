import {FileCollection} from 'meteor/ostrio:files';
import path from 'path';
import {check} from 'meteor/check';

export const BASEDIR = path.resolve('.').split('.meteor')[0];
 
export const Files = new FilesCollection({
    storagePath: BASEDIR + '.meteor/private/data',
    collectionName: 'Files',
    allowClientCode: false,
    onBeforeUpload: function(file) {
        if (file.size <= 10485760 && /png|jpg|jpeg|gif|mp3|mp4|txt|md|pdf/i.test(file.extension)) {
            return true;
        } else {
            return 'Please upload file of types .png, .jpg, .jpeg, .gif, .mp3, .mp4, .txt, .md or .pdf, with size equal or less than 10MB';
        }
    }
});

if (Meteor.isClient) {
    Meteor.subscribe('files.all');
}

if (Meteor.isServer) {    
    Meteor.publish('files.all', function() {
        return Files.find().cursor;
    });
    
    Meteor.methods({
        'files.remove'(id) {
            check(id, String);
            Files.remove(id);
        }
    })
}