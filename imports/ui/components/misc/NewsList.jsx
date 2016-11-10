import React from 'react';
import {connect} from 'react-redux';
import {createContainer} from 'meteor/react-meteor-data';
import PostList from './PostList.jsx';
import {Posts} from '../../api/posts';
import {store} from '../../api/store';

class NewsList extends React.Component {
    render() {
        return (
            <PostList {...this.props}>
                {this.props.posts}
            </PostList>
        );
    }
}


const meteorContainer = createContainer(({pageCount}) => {
    let handle = Meteor.subscribe('posts', ['news'], pageCount *20, false);
    return {
        postsReady: handle.ready(),
        posts: Posts.find({tags: {$in: ['news']}, hidden: false}).fetch()
    }
}, NewsList);



mapStateToProps = (state) => {
    return {
        pageCount: state.pageCount.news
    }
}

export default connect(mapStateToProps)(meteorContainer);
