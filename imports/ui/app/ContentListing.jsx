import React from 'react';
import {connect} from 'react-redux';
import {createContainer} from 'meteor/react-meteor-data';
import styles from '../styles';
import {newPost, setContent, setRating, loadPage, editPost, deletePost, 
        setPage, searchGoogle} from '../actions/actions';
import {Posts, LIMIT} from '../../api/posts';
import PostList from '../components/PostList.jsx';

class ContentListing extends React.Component {
    render() {
        return (
                <PostList {...this.props} tags={[this.props.category]}>
                    {this.props.posts}
                </PostList>
        );
    }
}

const meteorContainer = createContainer(({pageCount, category}) => {
    let tags = [category];
    
    if (category === 'selected') {
        tags = ['selected', 'vietnam', 'america', 'world', 'overseas', 'usElection', 'eastSea', 'opinion'];
        
    } else if (category === 'englishSelected') {
        tags = ['englishSelected', 'englishWorld', 'englishUs', 'englishVietnam', 'englishEastSea'];
    }
    
    let handle = Meteor.subscribe('posts', tags, pageCount * LIMIT, false);
    return {
        postsReady: handle.ready(),
        posts: Posts.find({tags: {$in: tags}, hidden: false}).fetch()
    }
}, ContentListing);


mapStateToProps = (state) => {
    return {
        contentId: state.contentId,
        contentType: state.contentType,
        content: state.content,
        category: state.category,
        pageCount: state.pageCount[state.category],
        editPostId: state.editPostId,
        editState: state.editState,
        target: state.target,
    }
}

mapDispatchToProps = (dispatch) => {
    return {
        newPost: (post) => dispatch(newPost(post)),
        setContent: (id, contentType, content) => dispatch(setContent(id, contentType, content)),
        editPost: (id) => dispatch(editPost(id, 'postEdit')),
        deletePost: (id) => dispatch(deletePost(id)),
        setPage: (page) => dispatch(setPage(page)),
        setRating: (id, rating, ratingCount, newRating) => dispatch(setRating(id, rating, ratingCount, newRating)),
        loadPage: (pageType) => dispatch(loadPage(pageType)),
        searchGoogle: (text) => dispatch(searchGoogle(text)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(meteorContainer);