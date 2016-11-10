import React from 'react';
import {Meteor} from 'meteor/meteor';
import {connect} from 'react-redux';
import {createContainer} from 'meteor/react-meteor-data';
import {Comments} from '../../api/comments';
import {setContent} from '../actions/actions';
import ReactMarkdown from 'react-markdown';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CommunicationComment from 'material-ui/svg-icons/communication/comment';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import ContentForward from 'material-ui/svg-icons/content/forward';
import ActionLaunch from 'material-ui/svg-icons/action/launch';
import ImageRemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentSave from 'material-ui/svg-icons/content/save';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ContentSend from 'material-ui/svg-icons/content/send';
import AvVideocam from 'material-ui/svg-icons/av/videocam';
import {red500, grey100, grey500, grey200, grey300, grey600, grey800} from 'material-ui/styles/colors';
import HorizontalCard from './HorizontalCard.jsx';
import styles from '../styles';
import PostModel from '../../api/PostModel';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Subheader from 'material-ui/Subheader';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';

const displayComments = (comments) => {
    console.log("COMMENTS", comments);
    return (
        <ul>
            {comments.map((comment) => {
                return <li>{comment.text}</li>
            })}
        </ul>
    )
}
    
class Post extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeSubtitle = this.onChangeSubtitle.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeVideo = this.onChangeVideo.bind(this);
        this.onChangeDisplayMode = this.onChangeDisplayMode.bind(this);
        this.onChangeOrientation = this.onChangeOrientation.bind(this);
        this.onChangePartition = this.onChangePartition.bind(this);
        this.onCheckHidden = this.onCheckHidden.bind(this);
        this.externalLinkFunction = this.externalLinkFunction.bind(this);
        this.isExternalReady = this.isExternalReady.bind(this);
        this.displayComments = this.displayComments.bind(this);
        this.toggleComments = this.toggleComments.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.submitComment = this.submitComment.bind(this);
        
        this.commentTextArea = null;
        
        this.state = {
            comment: '',
            commentsDisplayed: false,
            form: {
                title: '',
                subtitle: '',
                text: '',
                images: '',
                video: '',
                hidden: false,
                mode: 'text',
                orientation: 'horizontal',
                partition: '[1,3]',
            }
        };
    }
    
    onChangeComment() {
        this.setState({comment: this.commentTextArea.value});
    }
    
    submitComment() {
        //alert(this.state.comment); 
        if (Meteor.userId) {
            Meteor.call('comments.insert', {text: this.state.comment, postId: this.props.data._id});
            this.setState({comment: ''});
        } else {
            alert("USER NEED TO LOGIN");
        }
    }
    
    displayComments(comments) {
        if (this.state.commentsDisplayed) {
            return (
                <div>
                    <div style={{marginLeft: 10, marginRight: 10, marginBottom: 20}}>
                            <textarea ref={(ref) => this.commentTextArea = ref} rows={3} style={{width: '100%'}}
                                placeholder='Ý kiến của bạn' value={this.state.comment} onChange={this.onChangeComment}></textarea><br/>
                            <FlatButton label="Đăng"
                                backgroundColor={grey200} hoverColor={grey300} labelPosition="right" primary={true}
                                style={{color: grey600, marginRight: '40px'}}
                                icon={<ContentSend color={grey600} style={styles.icon} />}
                                onClick={this.submitComment} />
                        
                    </div>
                    <div style={{marginLeft: 10, marginRight: 10, marginBottom: 20, fontSize: '0.75em'}}>
                        {comments.length > 0 ? <Divider /> : null}
                        {comments.map((comment, index) => {
                            let style = {margin: 0, padding: 0};
                            let style2= {paddingLeft: 10, paddingTop: 10};
                            let style3 = {paddingTop: 0, paddingLeft: 20, paddingBottom: 10};
                            if (index % 2 === 0) {
                                style = Object.assign({}, style, {backgroundColor: grey100});
                            }
                            return (
                                <div style={style}>
                                    <div style={style2}><span style={{fontWeight: 'bold'}}>{comment.userId}</span>, 
                                            <span style={{color: grey500}}> {comment.createdAt.toString()}</span></div>
                                    <div style={style3}>{comment.text}</div>
                                    <Divider/>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
    }
   
    calcHeight() {
        return this.props.heightFactor * 120;
    }

    onChangeTitle(e) {
        this.setState({form: Object.assign(this.state.form, {title: e.target.value})});
    }
    
    onChangeSubtitle(e) {
        this.setState({form: Object.assign(this.state.form, {subtitle: e.target.value})});
    }
    
    onChangeText(e) {
        this.setState({form: Object.assign(this.state.form, {text: e.target.value})});
    }
    
    onChangeImage(e) {
        this.setState({form: Object.assign(this.state.form, {image: e.target.value})});
    }
    
    onChangeVideo(e) {
        this.setState({form: Object.assign(this.state.form, {video: e.target.value})});
    }
    
    onCheckHidden(e, value) {
        this.setState({form: Object.assign(this.state.form, {hidden: value})});
    }
    
    onChangeDisplayMode(e, value) {
        this.setState({form: Object.assign(this.state.form, {mode: value})});
    }
    
    onChangePartition(e, value) {
        this.setState({form: Object.assign(this.state.form, {partition: value})});
    }
    
    onChangeOrientation(e, value) {
        this.setState({form: Object.assign(this.state.form, {orientation: value})});
    }
    
    externalLinkFunction() {
        if (this.isExternalReady()) {
            return () => this.props.setExternalContent(this.props.data.source.link, this.props.data.source.name);
        }
        return () => {};
    }
    
    isExternalReady() {
        if (this.props.data.source.link && this.props.setExternalContent) {
            return true;
        }
        return false;
    }
    
    toggleComments(event) {
        event.preventDefault();
        this.setState({commentsDisplayed: !this.state.commentsDisplayed});
    }
    
    render() {
        if (this.props.orientation === 'vertical') {
            return (
                <Card {...this.props} expandable={true} expanded={null} 
                        initiallyExpanded={this.props.initiallyExpanded !== undefined ? this.props.initiallyExpanded: true} 
                        style={Object.assign(styles.verticalStyle, this.props.style)} >
                    <CardMedia style={{flex: 1}}>{ 
                        this.props.mode === 'video' ?
                             <iframe id="ytplayer" type="text/html" width={600} height={340} 
                                    src={this.props.data.videoEmbeddedStr()} frameBorder="0" allowFullScreen></iframe>
                            : <img src={this.props.data.getImage()} style={this.isExternalReady() ? {cursor: 'pointer'} : {}} onClick={this.externalLinkFunction()} />
                    }</CardMedia>
                    <CardTitle title={this.props.data.title} subtitle={this.props.data.subtitle}  width={1000} titleStyle={{lineHeight: '28px'}} style={{cursor: 'pointer'}}/>
                    <CardText expandable={true} >
                            <ReactMarkdown source={this.props.data.text} /> 
                            {this.isExternalReady()
                                        ? <div onClick={this.externalLinkFunction()} style={{cursor: 'pointer', color: grey500}} >
                                                &diams; {this.props.data.source.name}</div> 
                                        : null}</CardText>
                    <CardActions style={{alignSelf: 'flex-end'}} 
                                    actAsExpander={true}
                                    showExpandableButton={true}
                                    >
                        <CommunicationComment style={styles.icon} color={this.state.commentsDisplayed ? grey800 : grey500} hoverColor={red500} onClick={this.toggleComments} /> 
                        <ImageRemoveRedEye style={styles.icon} color={grey500} />
                        { this.isExternalReady() 
                                        ? <ActionLaunch onClick={this.externalLinkFunction()}
                                                style={Object.assign({}, styles.icon, {cursor: 'pointer'})} color={grey500} hoverColor={red500} />
                                        : null}
                                        }}
                    </CardActions>
                    {this.displayComments(this.props.comments)}
                </Card>
            );
        } else {
            return (
                <HorizontalCard {...this.props} style={Object.assign(styles.horizontalStyle, this.props.style)} >
                    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap'}}>
                        <CardMedia type='CardMedia' style={{flex: this.props.partition[0]}}>{ 
                            (this.props.mode === 'video' ?
                                <iframe id="ytplayer" type="text/html" width={this.props.width} height={this.calcHeight()} 
                                        src={this.props.data.videoEmbeddedStr()} frameBorder="0" allowFullScreen></iframe>
                                : <img src={this.props.data.getImage()} style={this.isExternalReady() ? {cursor: 'pointer'} : {}} onClick={this.externalLinkFunction()} />)
                        }</CardMedia>

                        <div style={{flex: this.props.partition[1]}}>
                            <CardTitle type='CardTitle' title={this.props.data.title} subtitle={this.props.data.subtitle}  titleStyle={{lineHeight: '28px'}} style={{cursor: 'pointer'}} />
                            <CardText type='CardText' expandable={true} >
                                    <ReactMarkdown source={this.props.data.text} />
                                    {this.isExternalReady()
                                        ? <div onClick={this.externalLinkFunction()} style={{cursor: 'pointer', color: grey500}} >
                                                &diams; {this.props.data.source.name}</div> 
                                        : null}
                            </CardText>

                        </div>

                    </div>
                    <div>
                        <CardActions type='CardActions'
                                actAsExpander={true}
                                showExpandableButton={true} >
                            <CommunicationComment style={styles.icon} color={this.state.commentsDisplayed ? grey800 : grey500} hoverColor={red500} onClick={this.toggleComments} /> 
                            <ImageRemoveRedEye style={styles.icon} color={grey500} />
                            { this.isExternalReady() 
                                    ? <ActionLaunch onClick={this.externalLinkFunction()}
                                            style={Object.assign({}, styles.icon, {cursor: 'pointer'})} color={grey500} hoverColor={red500} />
                                    : null}
                                    }}
                        </CardActions>
                        {this.displayComments(this.props.comments)}
                    </div>
                </HorizontalCard>
            );
        }
    }
}

Post.propTypes = { 
    data: React.PropTypes.object,
    style: React.PropTypes.object,
    partition: React.PropTypes.array,
    orientation: React.PropTypes.string,
    mode: React.PropTypes.string,
    heightFactor: React.PropTypes.number,
    width: React.PropTypes.string,
    handleSetMode: React.PropTypes.function,
};

Post.defaultProps = { 
    data: new PostModel({
        title: 'Post title',
        subtitle: 'Post subtitle',
        text: 'Post text',
        images: ['https://static.pexels.com/photos/1562/italian-landscape-mountains-nature-large.jpg'],
        videos: ['mtqOUd5Ds-E'],
        author: '',
        source: '',
    }),
    style: {},
    partition: [1,2],
    orientation: 'vertical',
    mode: 'image',
    heightFactor: 1,
    width: '100%',
    handleSetMode: () => {},
};

let meteorContainer = createContainer(({data}) => {
    let handle = Meteor.subscribe('comments', {});
    return {
        ready: handle.ready(),
        comments: Comments.find({postId: data._id}).fetch()
    }
}, Post);

mapDispatchToProps = (dispatch) => {
    return {
        setExternalContent: (url, text) => dispatch(setContent(null, 'post', {source: {link: url, type: 'external', text: text}}))
    }
}
  
export default connect(() => {return {}}, mapDispatchToProps)(meteorContainer);