import React from 'react';
import {connect} from 'react-redux';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {loadAdminPage} from '../../actions/actions';
import {List} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import ActionVisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import {red500, orange500, grey500, grey200, grey300, grey600} from 'material-ui/styles/colors';
import ImageListItem from '../../components/ImageListItem.jsx';
import {Posts} from '../../../api/posts';
import styles from '../../styles';

const styles2 = {
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        width: 600,
    }
}
class ListPosts extends React.Component {
    constructor(props) {
        super(props);
        this.handleSaveHidden = this.handleSaveHidden.bind(this);
        this.listItems = {};
        this.actionClicked = false;
    }
    
    handleSaveHidden(id, hiddenFlag) {
        Meteor.call('posts.updateHidden', id, hiddenFlag);
    }
    
    render() {
        if (!this.props.posts) return null;
        let newArr = [];
        for (let i=0; i< this.props.posts.length; i++) {
            let post = this.props.posts[i];
            let image = post.images.length > 0 ? post.images[0] 
                    : 'http://lorempixel.com/100/60/fashion/';
            let videoId = post.videos.length > 0 ? post.videos[0] : null;
            
            let item = {
                _id: post._id || 'unknown',
                videos: [videoId],
                images: [image],
                title: post.title,
                subtitle: post.subtitle,
                text: post.text,
                source: post.source,
                mode: 'article',
                hidden: post.hidden,
            };
            
            let comp = (<ImageListItem _id={post._id}
                        ref={(ref) => this.listItems[post._id] = ref}
                        leftAvatar={<img width={100} src={image} />}
                        rightIcon={
                            <div>
                                {item.hidden ? <ActionVisibilityOff color={grey600} hoverColor={red500} style={styles.iconSmall} 
                                                    onTouchTap={(e) => {
                                                        //e.preventDefault();
                                                        this.actionClicked = true;
                                                        this.handleSaveHidden(post._id, false)
                                                    }} />
                                        : <ActionVisibility color={grey600} hoverColor={red500} style={styles.iconSmall} 
                                                    onTouchTap={(e) => {
                                                        //e.preventDefault();
                                                        this.actionClicked = true;
                                                        this.handleSaveHidden(post._id, true);
                                                        }} /> 
                                                    }
                                                    
                                <EditorModeEdit color={grey600} hoverColor={red500} style={styles.iconSmall} 
                                        onTouchTap={(e) => {
                                            //e.preventDefault();
                                            this.actionClicked = true;
                                            this.props.editPost(post._id);
                                        }} />
                                        
                                <ActionDelete color={grey600} hoverColor={red500} style={styles.iconSmall}
                                        onTouchTap={(e) => {
                                            //e.preventDefault();
                                            this.actionClicked = true;
                                            if (confirm('Are you sure you want to delete this post?')) {
                                                this.props.deletePost(post._id);
                                            }
                                        }} />
                            </div>
                        }
                        style={item.hidden ? {backgroundColor: grey200} : {}}
                        primaryText={post.title}
                        secondaryText={post.subtitle}
                        secondaryTextLines={2}
                        onTouchTap={() => {
                                if (this.actionClicked) {
                                    this.actionClicked = !this.actionClicked;
                                } else {
                                    window.scrollTo(0,0);
                                    this.props.showPost(post._id);
                                }
                            }}
                        />);
             newArr.push(comp);
             newArr.push(<Divider />);
        }

        return (
            <List>
                {newArr}
            
                <div style={styles2.button} >
                    <RaisedButton
                            label="TẢI THÊM"
                            onTouchTap={this.props.loadAdminPage}
                            secondary={true}
                            icon={<FileFileDownload />} />
                </div>
            
            </List>);
    }
}



const meteorContainer = createContainer(({pageCount}) => {
    let handle = Meteor.subscribe('posts', null, pageCount * 20);
    return {
        ready: handle.ready(),
        posts: Posts.find({}).fetch()
    }
}, ListPosts);

mapStateToProps = (state) => {
    return {
        pageCount: state.admin.pageCount
    }
}

mapDispatchToProps = (dispatch) => {
    return {
        loadAdminPage: () => dispatch(loadAdminPage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (meteorContainer);
