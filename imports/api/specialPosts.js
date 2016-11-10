import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const SpecialPosts = new Mongo.Collection('specialPosts');

if (Meteor.isClient) {
    Meteor.subscribe('specialPosts.get');
}

if (Meteor.isServer) {
    Meteor.publish('specialPosts.get', function() {
        return SpecialPosts.find({});
    });
    
    Meteor.methods({
        'specialPosts.upsert'(obj) {
            check(obj, Object);
            return SpecialPosts.update({}, obj, {upsert: true});
        }
    })
}