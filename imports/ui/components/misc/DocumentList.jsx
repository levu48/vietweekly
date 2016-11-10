import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import PostList from './PostList.jsx';
import {Posts} from '../../api/posts';

class DocumentList extends React.Component {
    render() {
        return (
            <PostList {...this.props}>
                {this.props.posts}
            </PostList>
        );
    }
}

export default createContainer(() => {
    return {
        posts: Posts.find({tags: {$in: ['document']}}).fetch()
    }
}, DocumentList);

