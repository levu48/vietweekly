import React from 'react';
import Post from './Post.jsx';
import PostModel from '../../api/PostModel';
import {Posts} from '../../api/posts';
import {createContainer} from 'meteor/react-meteor-data';

class PostQuery extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return <Post {...this.props} data={new PostModel(this.props.post)} />
    }
}

export default createContainer(({query = {}}) => {
   let handle = Meteor.subscribe('posts.getPosts', query);
   return {
       ready: handle.ready(),
       post: Posts.findOne(query)
   } 
}, PostQuery);