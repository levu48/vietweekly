import React from 'react';
import {connect} from 'react-redux';
import FrontPage from './pages/FrontPage.jsx';
import WebPage from '../components/WebPage.jsx';
import Post from '../components/Post.jsx';
import PostInfo from '../components/PostInfo.jsx';
import YtVideo from '../components/YtVideo.jsx';
import GoogleSearch from '../components/GoogleSearch.jsx';
import PostModel from '../../api/PostModel';
import {Posts} from '../../api/posts';
import PostEdit from './admin/PostEdit.jsx';
import styles from '../styles';
import {setContent, deletePost} from '../actions/actions';
import PostForm from './admin/PostForm.jsx';

class RightColumn extends React.Component {
    
    constructor(props) {
        super(props);
        this.isExternal = this.isExternal.bind(this);
    }
    
    isExternal() {
        if (this.props.content !== null && this.props.content.source && this.props.content.source.type === 'external') {
            return true;
        }
        return false;
    }
    
    render() {
        let divStyle = { 
                position: 'absolute', top: 0, left: 370,
                width: 'calc(100% - 370px)', height: '100%',
                overflowY: 'auto', overflowX: 'hidden',
            };
            
        let webPageUrl = this.props.content == null
                ? 'http://vnexpress.net/tin-tuc/thoi-su/da-nang-quyet-phuong-an-mo-cua-hut-gio-cho-toa-nha-2-000-ty-3452215.html'
                : this.props.content.source.link ;
                
        if (this.props.editState === 'new') {
            return  <div style={divStyle}>
                        <PostForm {...this.props} />
                    </div>
                    
        } else if (this.props.editPostId && this.props.page === 'postEdit' && this.props.editState === 'edit') {
            let post = Posts.findOne({_id: this.props.editPostId});
            return (
                <div style={divStyle}>
                    <PostEdit {...this.props} data={new PostModel(post)} 
                            style={{width: styles.mainDisplayWidth, marginTop: '0'}} 
                            orientation='horizontal' partition={[1,3]}
                            heightFactor='2'
                            mode='image'
                            />
                </div>
            );
                    
        } else if (this.props.contentType === 'search') {
            return (
                <div style={divStyle}>
                    <GoogleSearch {...this.props} />
                </div>
            );
                    
        } else if (this.props.contentType === 'editorial') {
            let post = Posts.findOne({_id: this.props.contentId});
            return (
                <div style={divStyle}>
                    <PostInfo {...this.props} data={new PostModel(post)} 
                            style={{width: '600px', marginTop: '10px'}} 
                            orientation={post.extras.orientation} partition={post.extras.partition}
                            heightFactor={post.extras.heightFactor} mode={post.extras.mode}
                            />
                    <FrontPage {...this.props} style={{width: '600px'}} />  
                </div>
            );
            
        } else if (this.isExternal()) {
            return (
                <div style={divStyle}>
                    <WebPage text="External Webpage"
                            url={webPageUrl}
                            style={{height: '100%', overflowX: 'hidden'}} />
                </div>
            );
            
        } else if (this.props.contentType === 'video') {
            let post = Posts.findOne({_id: this.props.contentId});
            return (
                <div style={divStyle}>
                    {/*<YtVideo {...this.props} style={{width: '600px', marginTop: '10px'}} />*/}
                    <Post {...this.props} data={new PostModel(post)} 
                            style={{width: '600px', marginTop: '10px'}} 
                            orientation={post.extras.orientation} partition={post.extras.partition}
                            heightFactor={post.extras.heightFactor} mode={post.extras.mode}
                            />
                    <FrontPage {...this.props} style={{width: '600px'}} />         
                </div>
            );
            
        } else if (this.props.contentType === 'post') {
            let post = Posts.findOne({_id: this.props.contentId});
            return (
                <div style={divStyle}>
                    <Post {...this.props} data={new PostModel(post)} 
                            style={{width: '600px', marginTop: '10px'}} 
                            orientation={post.extras.orientation} partition={post.extras.partition}
                            heightFactor={post.extras.heightFactor} mode={post.extras.mode}
                            />
                    <FrontPage {...this.props} style={{width: '600px'}} />  
                </div>
            );

                    
            
        } else {
            return <div style={divStyle}><FrontPage {...this.props} style={{width: '600px'}} /></div>;
        }
    }
}  

mapStateToProps = (state) => {
    return {
        searchText: state.searchText,
    }
}

mapDispatchToProps = (dispatch) => {
    return {
        deletePost: (id) => dispatch(deletePost(id)),
        setExternalContent: (url, text) => dispatch(setContent(null, 'post', {source: {link: url, type: 'external', text: text}}))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(RightColumn);