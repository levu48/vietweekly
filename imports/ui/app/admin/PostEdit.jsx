import React from 'react';
import {MarkdownEditor} from 'react-markdown-editor';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CommunicationComment from 'material-ui/svg-icons/communication/comment';
import ImageRemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ContentSave from 'material-ui/svg-icons/content/save';
import ContentClear from 'material-ui/svg-icons/content/clear';
import {red500, grey500, grey200, grey300, grey600} from 'material-ui/styles/colors';
import HorizontalCard from '../../components/HorizontalCard.jsx';
import styles from '../../styles';
import PostModel from '../../../api/PostModel';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Subheader from 'material-ui/Subheader';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Checkbox from 'material-ui/Checkbox';

export default class PostEdit extends React.Component {
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
        this.onChangeSourceName = this.onChangeSourceName.bind(this);
        this.onChangeSourceLink = this.onChangeSourceLink.bind(this);
        this.onChangeTag = this.onChangeTag.bind(this);
        this.checkTag = this.checkTag.bind(this);
        
        this.state = {
            form: {
                title: this.props.data.title,
                subtitle: this.props.data.subtitle,
                editorial: this.props.data.editorial,
                text: this.props.data.text,
                image: this.props.data.getImage(),
                video: this.props.data.getVideo(),
                sourceName: this.props.data.source.name,
                sourceLink: this.props.data.source.link,
                sourceType: this.props.data.source.type,
                tags: this.props.data.tags || [],
                hidden: this.props.data.hidden,
                mode: this.props.data.extras && this.props.data.extras.mode ? this.props.data.extras.mode : 'text',
                orientation: this.props.data.extras && this.props.data.extras.orientation ? this.props.data.extras.orientation : 'horizontal',
                partition: this.props.data.extras.partition[0] && this.props.data.extras.partition[1] 
                        ? '[' + this.props.data.extras.partition[0] + ',' + this.props.data.extras.partition[1] + ']' 
                        : '[1,3]',
            }
        };
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
    
    onChangeSourceName(e, value) {
        this.setState({form: Object.assign(this.state.form, {sourceName: value})});
    }
    
    onChangeSourceLink(e, value) {
        this.setState({form: Object.assign(this.state.form, {sourceLink: value})});
    }
    
    onEditorialChange(e) {
        
    }
    
    onChangeTag(e, checked, value) {        
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
    
    
    handleError(mesg) {
        console.log("ERROR:", mesg); 
    }
    
    
    handleSave(id, item) {
        if (!item.title) {
            this.handleError('Title is required');
            return;
        }
        
        window.scrollTo(0,0);
        Meteor.call('posts.update', id, item, (error) => this.props.savePost(id));
        this.props.setPage('unknown');
    }  
    
    handleSaveAsNew(item) {
        if (!item.title) {
            this.handleError('Title is required');
            return;
        }
        
        window.scrollTo(0,0);
        Meteor.call('posts.insert', item, (error, result) => this.props.saveNewPost(result));
    }    
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            form: {
                title: nextProps.data.title,
                subtitle:  nextProps.data.subtitle,
                editorial: nextProps.data.editorial,
                text: nextProps.data.text,
                image: nextProps.data.getImage(),
                video: nextProps.data.getVideo(),
                sourceName: nextProps.data.source.name,
                sourceLink: nextProps.data.source.link,
                sourceType: nextProps.data.source.type,
                tags: nextProps.data.tags || [],
                hidden: nextProps.data.hidden,
                mode: nextProps.data.extras && nextProps.data.extras.mode ? nextProps.data.extras.mode : 'text',
                orientation: nextProps.data.extras && nextProps.data.extras.orientation ? nextProps.data.extras.orientation : 'horizontal',
                partition: nextProps.data.extras.partition[0] && nextProps.data.extras.partition[1] 
                        ? '[' + nextProps.data.extras.partition[0] + ',' + nextProps.data.extras.partition[1] + ']' 
                        : '[1,3]',
            }
        });
    }

    render() {
        let style1 = {width: '530px', marginLeft: '20px'};
        let style2 = {width: '100%'};
        
        return (
            <Card {...this.props} orientation='vertical' style={Object.assign(styles.verticalStyle, this.props.style)} >
                    <CardMedia type='CardMedia' style={{flex: this.props.partition[0], width: '600px'}} > 
                        <img src={this.props.data.getImage()} />
                    </CardMedia>

                    <CardTitle type='CardTitle' title={this.props.data.title} subtitle={this.props.data.subtitle} style={{width: '530px'}} titleStyle={{lineHeight: '28px' }}/>
                    <form ref={(ref) => this.form = ref} onSubmit={() => console.log("DISPLAY EDIT ON SUBMIT")} style={style1} >
                        <TextField floatingLabelText="Title" hintText='Title' onChange={this.onChangeTitle} 
                                value={this.state.form.title} errorText="This field is required" style={style2} /><br/>
                        <TextField floatingLabelText="Subtitle" hintText='Subtitle' onChange={this.onChangeSubtitle} 
                                value={this.state.form.subtitle} style={style2} /><br/>
                        <br/>
                        <label class='formLabel' >Editorial</label><br/>
                        <MarkdownEditor ref='editorial' onContentChange={this.onEditorialChange} initialContent={this.state.form.editorial} iconsSet="font-awesome" />
                        <label class='formLabel' >Text</label><br/>
                        <MarkdownEditor ref='markdownEditor' onContentChange={this.onMarkdownContentChange} initialContent={this.state.form.text} iconsSet="font-awesome" />


                        <TextField floatingLabelText="Image" value={this.state.form.image} hintText="Image"  onChange={this.onChangeImage} fullWidth={true} /><br />
                        <TextField floatingLabelText="Video" value={this.state.form.video} hintText="Video"  onChange={this.onChangeVideo} fullWidth={true} /><br />
                        <TextField floatingLabelText="SourceName" value={this.state.form.sourceName} hintText="Source name"  onChange={this.onChangeSourceName} fullWidth={true} /><br />
                        <TextField floatingLabelText="SourceLink" value={this.state.form.sourceLink}  hintText="Source link"  onChange={this.onChangeSourceLink} fullWidth={true} /><br />
                        
                        <br/>
                        <div style={{color: grey500}} >Tags</div>
                        <Checkbox label="Tổng hợp" onCheck={(e, value) => this.onChangeTag(e, value, 'news')} checked={this.checkTag('news')} style={styles.checkbox} />
                        <Checkbox label="Chọn lọc" onCheck={(e, value) => this.onChangeTag(e, value, 'selected')} checked={this.checkTag('selected')} style={styles.checkbox} />
                        <Checkbox label="Việt Nam" onCheck={(e, value) => this.onChangeTag(e, value, 'vietnam')} checked={this.checkTag('vietnam')} style={styles.checkbox} />
                        <Checkbox label="Hoa Kỳ" onCheck={(e, value) => this.onChangeTag(e, value, 'america')} checked={this.checkTag('america')} style={styles.checkbox} />
                        <Checkbox label="Thế giới" onCheck={(e, value) => this.onChangeTag(e, value, 'world')} checked={this.checkTag('world')} style={styles.checkbox} />
                        <Checkbox label="Hải ngoại" onCheck={(e, value) => this.onChangeTag(e, value, 'overseas')} checked={this.checkTag('overseas')} style={styles.checkbox} />
                        <Checkbox label="Bầu cử Mỹ 2016" onCheck={(e, value) => this.onChangeTag(e, value, 'usElection')} checked={this.checkTag('usElection')} style={styles.checkbox} />
                        <Checkbox label="Biển Đông" onCheck={(e, value) => this.onChangeTag(e, value, 'eastSea')} checked={this.checkTag('eastSea')} style={styles.checkbox} />
                        <Checkbox label="Bình luận" onCheck={(e, value) => this.onChangeTag(e, value, 'opinion')} checked={this.checkTag('opinion')} style={styles.checkbox} />
                        <Checkbox label="Việt Nam Ký sự" onCheck={(e, value) => this.onChangeTag(e, value, 'vietnamJournal')} checked={this.checkTag('vietnamJournal')} style={styles.checkbox} />
                        <Checkbox label="Video" onCheck={(e, value) => this.onChangeTag(e, value, 'video')} checked={this.checkTag('video')} style={styles.checkbox} />
                        {/*<Checkbox label="RSS" onCheck={(e, value) => this.onChangeTag(e, value, 'rss')} checked={this.checkTag('rss')} style={styles.checkbox} />*/}
                        <Checkbox label="English" onCheck={(e, value) => this.onChangeTag(e, value, 'english')} checked={this.checkTag('english')} style={styles.checkbox} />
                        <Checkbox label="Selected" onCheck={(e, value) => this.onChangeTag(e, value, 'englishSelected')} checked={this.checkTag('englishSelected')} style={styles.checkbox} />
                        <Checkbox label="World" onCheck={(e, value) => this.onChangeTag(e, value, 'englishWorld')} checked={this.checkTag('englishWorld')} style={styles.checkbox} />
                        <Checkbox label="US" onCheck={(e, value) => this.onChangeTag(e, value, 'englishUs')} checked={this.checkTag('englishUs')} style={styles.checkbox} />
                        <Checkbox label="Vietnam" onCheck={(e, value) => this.onChangeTag(e, value, 'englishVietnam')} checked={this.checkTag('englishVietnam')} style={styles.checkbox} />
                        <Checkbox label="East Sea" onCheck={(e, value) => this.onChangeTag(e, value, 'englishEastSea')} checked={this.checkTag('englishEastSea')} style={styles.checkbox} />

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
                        <Checkbox label="Hidden" onCheck={this.onCheckHidden} checked={this.state.form.hidden} style={styles.checkbox} />
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
                            onClick={() => this.handleSave(this.props.data._id, {
                                    title: this.state.form.title,
                                    subtitle: this.state.form.subtitle,
                                    editorial: this.refs.editorial.state.content,
                                    text: this.refs.markdownEditor.state.content,
                                    images: this.state.form.image ? [this.state.form.image] : [],
                                    videos: this.state.form.video ? [this.state.form.video] : [],
                                    source: {
                                        name: this.state.form.sourceName || '',
                                        link: this.state.form.sourceLink || '',
                                        type: this.state.form.sourceType || '',
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
                            label="SAVE AS NEW"
                            labelPosition="right"
                            primary={true}
                            style={{color: grey600, marginRight: '10px'}}
                            icon={<ContentSave color={grey600} style={styles.icon} />}
                            onClick={() => this.handleSaveAsNew({
                                    title: this.state.form.title,
                                    subtitle: this.state.form.subtitle,
                                    editorial: this.refs.editorial.state.content,
                                    text: this.refs.markdownEditor.state.content,
                                    images: this.state.form.image ? [this.state.form.image] : [],
                                    videos: this.state.form.video ? [this.state.form.video] : [],
                                    source: {
                                        name: this.state.form.sourceName || '',
                                        link: this.state.form.sourceLink || '',
                                        type: this.state.form.sourceType || '',
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
                                label="DELETE"
                                labelPosition="right"
                                primary={true}
                                style={{color: grey600, marginRight: '10px'}}
                                icon={<ActionDelete color={grey600} style={styles.icon} />}
                                onClick={() => {
                                    if (confirm('Are you sure you want to delete this post?')) {
                                        window.scrollTo(0,0);
                                        this.props.deletePost(this.props.data._id);
                                        this.props.setPage('unknown');
                                    }
                                }}
                            />      
                        <FlatButton
                            backgroundColor={grey200}
                            hoverColor={grey300}
                            label="CANCEL"
                            labelPosition="right"
                            primary={true}
                            style={{color: grey600, marginRight: '40px'}}
                            icon={<ContentClear color={grey600} style={styles.icon} />}
                            onClick={() => {window.scrollTo(0,0); this.props.cancelPost(this.props.data._id);}}
                        />
                    </CardActions>

            </Card>
        );
    }
}

PostEdit.propTypes = { 
    data: React.PropTypes.object,
    style: React.PropTypes.object,
    partition: React.PropTypes.array,
    orientation: React.PropTypes.string,
    mode: React.PropTypes.string,
    heightFactor: React.PropTypes.number,
    width: React.PropTypes.string,
    handleSetMode: React.PropTypes.function,
};

PostEdit.defaultProps = { 
    data: new PostModel({
        title: 'Post title',
        subtitle: '',
        text: '',
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