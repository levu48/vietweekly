import React from 'react';
import {connect} from 'react-redux';
import ListPosts from './ListPosts.jsx';
import PostForm from './PostForm.jsx';
import PostView from './PostView.jsx';
import PostEdit from './PostEdit.jsx';
import SpecialPostsForm from './SpecialPostsForm.jsx';
import ListFiles from './ListFiles.jsx';
import FileUploadForm from './FileUploadForm.jsx';
import Post from '../../components/Post.jsx';
import PostModel from '../../../api/PostModel';
import {Posts} from '../../../api/posts';
import styles from '../../styles';
import {showPost, editPost, deletePost, cancelNewPost, cancelPost, savePost, saveNewPost} from '../../actions/actions';

class WorkingSpace extends React.Component {

    render() {
        if (this.props.editState === 'new') {
            return <PostForm {...this.props} />

        } else if (this.props.editState === 'show') {
            let post = Posts.findOne({_id: this.props.editPostId});
            return <PostView {...this.props} data={new PostModel(post)} 
                style={{width: styles.mainDisplayWidth, marginTop: '0'}} 
                orientation='horizontal' partition={[1,3]}
                heightFactor='2'
                mode='image'
                />
                
        } else if (this.props.editState === 'edit') {
            let post = Posts.findOne({_id: this.props.editPostId});
            return <PostEdit {...this.props} data={new PostModel(post)} 
                style={{width: styles.mainDisplayWidth, marginTop: '0'}} 
                orientation='horizontal' partition={[1,3]}
                heightFactor='2'
                mode='image'
                />
        
        } else if (this.props.editState === 'list') {
            return <ListPosts {...this.props} />
            
        } else if (this.props.editState === 'specialPosts') {
            return <SpecialPostsForm {...this.props} />    
            
        } else if (this.props.editState === 'listFiles') {
            return <ListFiles {...this.props} />
            
        } else if (this.props.editState === 'fileUpload') {
            return <FileUploadForm {...this.props} />

        } else {
            return <div></div>
        }
    }
}



mapStateToProps = (state) => {
    return {
        editPostId: state.editPostId,
        editState: state.editState,
    }
}

mapDispatchToProps = (dispatch) => {
    return {
        showPost: (id) => dispatch(showPost(id)),
        editPost: (id) => dispatch(editPost(id)),
        deletePost: (id) => dispatch(deletePost(id)),
        cancelNewPost: () => dispatch(cancelNewPost()),
        cancelPost: (id) => dispatch(cancelPost(id)),
        savePost: (id) => dispatch(savePost(id)),
        saveNewPost: (id) => dispatch(saveNewPost(id)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(WorkingSpace);