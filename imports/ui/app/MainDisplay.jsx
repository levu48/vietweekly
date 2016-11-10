import React from 'react';
import {connect} from 'react-redux';
import Post from '../components/Post.jsx';
import YtVideo from '../components/YtVideo.jsx';
import PostModel from '../../api/PostModel';
import {Posts} from '../../api/posts';
import styles from '../styles';
import {showPost, editPost, deletePost, cancelNewPost, cancelPost, savePost, saveNewPost} from '../actions/actions';

class MainDisplay extends React.Component {
    render() {
        if (this.props.contentType === 'video') {
            return <YtVideo {...this.props} style={{marginBottom: '10px'}} />

        } else if (this.props.contentType === 'post') {
            let post = Posts.findOne({_id: this.props.contentId});
            return <Post {...this.props} data={new PostModel(post)} 
                style={{width: styles.mainDisplayWidth, marginTop: '0', marginBottom: '10px'}} 
                orientation='horizontal' partition={[1,3]}
                heightFactor='2'
                mode='image'
                />
        } else if (this.props.contentType === 'editorial') {
            let post = Posts.findOne({_id: this.props.contentId});
            return <Post {...this.props} data={new PostModel(post)} 
                style={{width: styles.mainDisplayWidth, marginTop: '0', marginBottom: '10px'}} 
                orientation='horizontal' partition={[1,3]}
                heightFactor='2'
                mode='editorial'
                />    
        } else {
            return <div></div>
        }
    }
}

mapStateToProps = (state) => {
    return {
        contentId: state.contentId,
        contentType: state.contentType,
        content: state.content,
        category: state.category,
    }
}

export default connect(mapStateToProps)(MainDisplay);