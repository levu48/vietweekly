import React from 'react';
import {connect} from 'react-redux';
import {createContainer} from 'meteor/react-meteor-data';
import PostList from './PostList.jsx';
import {Posts} from '../../api/posts';
import {store} from '../../api/store';

class OpinionList extends React.Component {
    render() {
        return (
            <PostList {...this.props}>
                {this.props.posts}
            </PostList>
        );
    }
}


const meteorContainer = createContainer(({pageCount}) => {
    let handle = Meteor.subscribe('posts', ['opinion'], pageCount.opinion *20, false);
    return {
        postsReady: handle.ready(),
        posts: Posts.find({
            $or: [
                {tags: {$in: ['opinion']}},
                {editorial: {$ne: null}},
            ], 
            hidden: false,
        }, {sort: {createdAt: -1}}).fetch()
    }
}, OpinionList);



mapStateToProps = (state) => {
    return {
        pageCount: state.pageCount.opinion
    }
}

export default connect(mapStateToProps)(meteorContainer);

