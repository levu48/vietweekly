import React from 'react';
import {connect} from 'react-redux';
import {MarkdownEditor} from 'react-markdown-editor';
import {savePost} from '../../actions/actions';
import {Meteor} from 'meteor/meteor';
import styles from '../../styles';
import {Card, CardHeader, CardMedia, CardTitle, CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CommunicationComment from 'material-ui/svg-icons/communication/comment';
import ImageRemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentSave from 'material-ui/svg-icons/content/save';
import ContentClear from 'material-ui/svg-icons/content/clear';
import {red500, grey500, grey200, grey300, grey600} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Checkbox from 'material-ui/Checkbox';
import HorizontalCard from '../../components/HorizontalCard.jsx';

class PostForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeSubtitle = this.onChangeSubtitle.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeVideo = this.onChangeVideo.bind(this);
        this.onChangeSourceName = this.onChangeSourceName.bind(this);
        this.onChangeSourceLink = this.onChangeSourceLink.bind(this);
        this.onChangeDisplayMode = this.onChangeDisplayMode.bind(this);
        this.onChangeOrientation = this.onChangeOrientation.bind(this);
        this.onChangePartition = this.onChangePartition.bind(this);
        this.onCheckHidden = this.onCheckHidden.bind(this);
        this.handleSaveAsNew = this.handleSaveAsNew.bind(this);
        this.onMarkdownContentChange = this.onMarkdownContentChange.bind(this);
        this.onEditorialChange = this.onEditorialChange.bind(this);
        this.handleError = this.handleError.bind(this);
        this.onTagChange = this.onTagChange.bind(this);
        this.checkTag = this.checkTag.bind(this);
        
        this.state = {
            form: {
                title: this.props.params.title || '',
                subtitle: this.props.params.subtitle || '',
                text: this.props.params.text || '',
                images: '',
                video: '',
                sourceName: this.props.params.source.name || '',
                sourceLink: this.props.params.source.link || '',
                tags: [],
                hidden: false,
                mode: 'text',
                orientation: 'horizontal',
                partition: '[1,3]',
            }
        };
    }


    onChangeTitle(e) {
        this.setState({form: Object.assign(this.state.form, {title: e.target.value})});
    }
    
    onChangeSubtitle(e) {
        this.setState({form: Object.assign(this.state.form, {subtitle: e.target.value})});
    }
    
    onChangeText(e) {
        //this.setState({form: Object.assign(this.state.form, {text: e.target.value})});
    }
    
    onEditorialChange(e) {
        
    }
    
    onMarkdownContentChange(text) {
        //this.setState({form: Object.assign(this.state.form, {text: text})});
    }
    
    onChangeImage(e) {
        this.setState({form: Object.assign(this.state.form, {image: e.target.value})});
    }
    
    onChangeVideo(e) {
        this.setState({form: Object.assign(this.state.form, {video: e.target.value})});
    }
    
    onChangeSourceName(e) {
        this.setState({form: Object.assign(this.state.form, {sourceName: e.target.value})});
    }
    
    onChangeSourceLink(e) {
        this.setState({form: Object.assign(this.state.form, {sourceLink: e.target.value})});
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
    
    handleSaveAsNew(item) {
        if (!item.title) {
            this.handleError('Title is required');
            return;
        }
        if (!item.subtitle) {
            this.handleError('Subtitle is required');
            return;
        }
        
        window.scrollTo(0,0);
        Meteor.call('posts.insert', item, (error, result) => this.props.savePost(result));
    }
    
    handleError(mesg) {
        console.log("FORM ERROR, STATE FORM", mesg, this.state);
    }
    
    onTagChange(e, checked, value) {        
        let tags = this.state.form.tags;
        if (checked && tags.indexOf(value) == -1) {
            tags.push(value);
        } else if (!checked && tags.indexOf(value) >= 0) {
            const index = tags.indexOf(value);
            tags.splice(index, 1);
        }
        
        this.setState({form: Object.assign({}, this.state.form, {tags: tags})});
    }
    
    checkTag(value) {
        if (this.state.form.tags.indexOf(value) >= 0) {
            return true;
        }
        return false;
    }
    
    
    render() {
        return (
            <Card {...this.props} orientation='vertical' style={Object.assign({}, styles.horizontalStyle, this.props.style)} >

                    <CardTitle type='CardTitle' title='Add a new post' subtitle='' style={{width: '530px'}} />
                    <form onSubmit={() => {}} style={{width: '100%', paddingLeft: '20px', paddingRight: '20px'}} >
                        <TextField floatingLabelText="Title" hintText='Title' onChange={this.onChangeTitle} value={this.state.form.title}
                                errorText="This field is required" style={{width: '100%'}} /><br/>
                        <TextField floatingLabelText="Subtitle" hintText='Subtitle' onChange={this.onChangeSubtitle} value={this.state.form.subtitle}
                                errorText="This field is required" style={{width: '100%'}}  /><br/><br/>
                        <label class='formLabel' >Editorial</label><br/>
                        <MarkdownEditor ref='editorial' onContentChange={this.onEditorialChange} initialContent='' iconsSet="font-awesome" /><br/>
                        <label class='formLabel' >Text</label><br/>
                        <MarkdownEditor ref='markdownEditor' onContentChange={this.onMarkdownContentChange} initialContent='' iconsSet="font-awesome" />
                        <TextField floatingLabelText="Image" hintText="Image"  onChange={this.onChangeImage} fullWidth={true} /><br />
                        <TextField floatingLabelText="Video" hintText="Video"  onChange={this.onChangeVideo} fullWidth={true} /><br />
                        <TextField floatingLabelText="SourceName" hintText="Source name"  onChange={this.onChangeSourceName} fullWidth={true} value={this.state.form.sourceName}/><br />
                        <TextField floatingLabelText="SourceLink" hintText="Source link"  onChange={this.onChangeSourceLink} fullWidth={true} value={this.state.form.sourceLink}/><br />
                         <br/>
                        <div style={{color: grey500}} >Tags</div>
                        <Checkbox label="Tổng hợp" onCheck={(e, value) => this.onTagChange(e, value, 'news')} checked={this.checkTag('news')} style={styles.checkbox} />
                        <Checkbox label="Việt Nam" onCheck={(e, value) => this.onTagChange(e, value, 'vietnam')} checked={this.checkTag('vietnam')} style={styles.checkbox} />
                        <Checkbox label="Hoa Kỳ" onCheck={(e, value) => this.onTagChange(e, value, 'america')} checked={this.checkTag('america')} style={styles.checkbox} />
                        <Checkbox label="Thế giới" onCheck={(e, value) => this.onTagChange(e, value, 'world')} checked={this.checkTag('world')} style={styles.checkbox} />
                        <Checkbox label="Hải ngoại" onCheck={(e, value) => this.onTagChange(e, value, 'overseas')} checked={this.checkTag('overseas')} style={styles.checkbox} />
                        <Checkbox label="Bầu cử Mỹ 2016" onCheck={(e, value) => this.onTagChange(e, value, 'usElection')} checked={this.checkTag('usElection')} style={styles.checkbox} />
                        <Checkbox label="Biển Đông" onCheck={(e, value) => this.onTagChange(e, value, 'eastSea')} checked={this.checkTag('eastSea')} style={styles.checkbox} />
                        <Checkbox label="Bình luận" onCheck={(e, value) => this.onTagChange(e, value, 'opinion')} checked={this.checkTag('opinion')} style={styles.checkbox} />
                        <Checkbox label="Việt Nam Ký sự" onCheck={(e, value) => this.onChangeTag(e, value, 'vietnamJournal')} checked={this.checkTag('vietnamJournal')} style={styles.checkbox} />
                        <Checkbox label="Video" onCheck={(e, value) => this.onTagChange(e, value, 'video')} checked={this.checkTag('video')} style={styles.checkbox} />

                        <br/>
                        
                        <div style={{marginTop: '20px', color: grey500}} >Display Mode</div>
                        <RadioButtonGroup name="displayMode" defaultSelected={this.state.form.mode} onChange={this.onChangeDisplayMode} >
                            <RadioButton
                                value="image"
                                label="Image and text"
                                style={styles.radioButton}
                            />
                            <RadioButton
                                value="video"
                                label="Video and text"
                                style={styles.radioButton}
                            />
                            <RadioButton
                                value="text"
                                label="Text only"
                                style={styles.radioButton}
                            />
                        </RadioButtonGroup><br />

                        <div style={{color: grey500}} >Orientation</div>
                        <RadioButtonGroup name="orientation" defaultSelected={this.state.form.orientation} onChange={this.onChangeOrientation} >
                            <RadioButton
                                value="vertical"
                                label="Vertical"
                                style={styles.radioButton}
                            />
                            <RadioButton
                                value="horizontal"
                                label="Horizontal"
                                style={styles.radioButton}
                            />
                        </RadioButtonGroup><br/>
                        <div style={{color: grey500}} >Partition</div>
                        <RadioButtonGroup name="partition" defaultSelected={this.state.form.partition.toString()} onChange={this.onChangePartition} >
                            <RadioButton
                                value="[1,1]"
                                label="[1,1]"
                                style={styles.radioButton}
                            />
                            <RadioButton
                                value="[1,2]"
                                label="[1,2]"
                                style={styles.radioButton}
                            />
                            <RadioButton
                                value="[1,3]"
                                label="[1,3]"
                                style={styles.radioButton}
                            />
                            <RadioButton
                                value="[3,1]"
                                label="[3,1]"
                                style={styles.radioButton}
                            />
                        </RadioButtonGroup><br/>
                        
                        <div style={{color: grey500}} >Visibility</div>
                        <Checkbox label="Hidden" onCheck={this.onCheckHidden}
                            checked={this.state.form.hidden} style={styles.checkbox} />
                    </form>
                    <CardActions type='CardActions'>
                        <FlatButton
                            backgroundColor={grey200}
                            hoverColor={grey300}
                            label="SAVE"
                            labelPosition="right"
                            primary={true}
                            style={{color: grey600, marginRight: '10px'}}
                            icon={<ContentSave color={grey600} style={styles.icon} />}                    
                            onClick={() => this.handleSaveAsNew({
                                    title: this.state.form.title,
                                    subtitle: this.state.form.subtitle,
                                    editorial: this.refs.editorial.state.content,
                                    //text: this.state.form.text,
                                    text: this.refs.markdownEditor.state.content,
                                    images: this.state.form.image ? [this.state.form.image] : [],
                                    videos: this.state.form.video ? [this.state.form.video] : [],
                                    source: {
                                        name: this.state.form.sourceName || '',
                                        link: this.state.form.sourceLink || '',
                                    },
                                    hidden: this.state.form.hidden,
                                    tags: this.state.form.tags,
                                    extras: {
                                        style: {},
                                        mode: this.state.form.mode,
                                        orientation: this.state.form.orientation,
                                        partition: eval(this.state.form.partition),
                                        heightFactor: 1,
                                    }
                            })}
                        />                        
                        <FlatButton
                            backgroundColor={grey200}
                            hoverColor={grey300}
                            label="CANCEL"
                            labelPosition="right"
                            primary={true}
                            style={{color: grey600, marginRight: '40px'}}
                            icon={<ContentClear color={grey600} style={styles.icon} />}
                            onClick={() => {window.scrollTo(0,0); this.props.cancelNewPost();}}
                        />
                    </CardActions>

            </Card>
        );
    }
}

mapStateToProps = (state) => {
    return {
        cmd: state.cmd,
        params: state.params || {source: {}},
        editPostId: state.editPostId,
        editState: state.editState,
    }
}

mapDispatchToProps = (dispatch) => {
    return {
        savePost: (postId) => dispatch(savePost(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);