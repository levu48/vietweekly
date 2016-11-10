import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import testComments from '../data/testComments';

export const Comments = new Mongo.Collection('comments');

if (Meteor.isServer) {
    
    Meteor.publish('comments', function(query = {}) {
        return Comments.find(query);
    });
    
    Meteor.methods({
        'comments.insert'(obj) {
            check(obj.text, String);
            check(obj.postId, String);
            if (obj.text && obj.postId && Meteor.user().username) {
                return Comments.insert({
                    text: obj.text,
                    postId: obj.postId,
                    userId: Meteor.user().username,
                    
                    createdAt: new Date(),
                    createdBy: new Date(),
                    approvedAt: new Date(),
                    approvedBy: 'admin',
                    updatedAt: new Date(),
                    updatedBy: 'admin',
                });
            }
        }
    });
}