import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import testPosts from '../data/testPosts';

const TAGS = ['news', 'document', 'opinion', 'video'];
export const LIMIT = 10;
const MAX_LIMIT = 1000;
export const Posts = new Mongo.Collection('posts');

if (Meteor.isClient) {
    Meteor.subscribe('posts');
}

if (Meteor.isServer) {
    Posts._ensureIndex({"source.link": 1});
    
    Meteor.publish('posts', function(tagsArray, limit = LIMIT, hidden) {
        let query = {};
        if (tagsArray) {
            query = {tags: {$in: tagsArray}};
        }
        
        if (hidden !== undefined) {
            query.hidden = hidden;
        }
        
        return Posts.find(query, {sort: {createdAt: -1}, limit: Math.min(limit, MAX_LIMIT)});
    });
    
    Meteor.publish('posts.getPosts', function(query = {}) {
        return Posts.find(query);
    })
    
    Meteor.methods({
        'posts.insert'(obj) {
            check(obj.title, String);
            check(obj.subtitle, String);
            check(obj.editorial, String);
            check(obj.text, String);
            check(obj.images, Array);
            check(obj.videos, Array);
            check(obj.source, Object);
            check(obj.tags, Array);
            check(obj.hidden, Boolean);
            check(obj.extras, Object);

            return Posts.insert({
                title: obj.title,
                subtitle: obj.subtitle,
                editorial: obj.editorial,
                text: obj.text,
                images: obj.images,
                videos: obj.videos,
                author: 'admin',
                source: obj.source,
                tags: obj.tags,
                hidden: obj.hidden,
                
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
                    style: obj.extras.style,
                    partition: obj.extras.partition,
                    orientation: obj.extras.orientation,
                    mode: obj.extras.mode,
                    heightFactor: obj.extras.heightFactor,
                }
            });
        },
        
        'posts.update'(_id, obj) {
            check(_id, String);
            check(obj.title, String);
            check(obj.subtitle, String);
            check(obj.editorial, String);
            check(obj.text, String);
            check(obj.hidden, Boolean);
            check(obj.tags, Array);
            check(obj.extras, Object);
            Posts.update(_id, {
                $set: {
                        title: obj.title,
                        subtitle: obj.subtitle,
                        editorial: obj.editorial,
                        text: obj.text,
                        images: obj.images,
                        videos: obj.videos,
                        source: obj.source,
                        hidden: obj.hidden,
                        tags: obj.tags,
                        updatedAt: new Date(),
                        updatedBy: 'admin',
                        extras: {
                            style: obj.extras.style,
                            partition: obj.extras.partition,
                            orientation: obj.extras.orientation,
                            mode: obj.extras.mode,
                            heightFactor: obj.extras.heightFactor,
                        }
                    }
                });
        },
        
        'posts.updateHidden'(_id, flag) {
            check(_id, String);
            check(flag, Boolean);
            Posts.update(_id, { $set: {hidden: flag}});
        },
        
        'posts.increaseViewsByOne'(_id) {
            check(_id, String);
            Posts.update(_id, {$inc: {views: 1}});
        },
        
        'posts.setRating'(_id, rating = 0, ratingCount = 0, newRating = 0) {
            rating = rating || 0;
            ratingCount = ratingCount || 0;
            check(_id, String);
            check(rating, Number);
            check(ratingCount, Number);
            check(newRating, Number);
            const val = ((rating * ratingCount) + newRating) / (ratingCount + 1);
            Posts.update(_id, {$inc: {ratingCount: 1}, $set: {rating: val}});
        },
        
        'posts.remove'(_id) {
            check(_id, String);
            Posts.remove(_id);
        },
        
        'posts.removeByTags'(tagsArr) {
            check(tagsArr, Array);
            Posts.remove({tags: {$in: tagsArr}});
        }
    });
}

