import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Resources = new Mongo.Collection('resources');

if (Meteor.isClient) {
    Meteor.subscribe('resources');
}

if (Meteor.isServer) {
    Meteor.publish('resources', function() {
        return Resources.find({});
    });
    
    Meteor.methods({
        'resources.insert'(obj) {
            check(obj.postId, String);
            check(obj.title, String);
            check(obj.link, String);
            obj.hidden = false;
            obj.views = 0;
            
            return Resources.insert(obj);
        },
        
        'resources.remove'(id) {
            check(id, String);
            Resources.remove(id);
        }
    });
}

