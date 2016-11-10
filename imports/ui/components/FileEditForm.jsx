import React from 'react';
import {MarkdownEditor} from 'react-markdown-editor';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import ContentClear from 'material-ui/svg-icons/content/clear';
import {red500, grey500, grey200, grey300, grey600} from 'material-ui/styles/colors';
import styles from '../styles';

export default class FileEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.resetState = this.resetState.bind(this);
        this.toggleOpen = this.toggleOpen.bind(this);
        this.onChangeFilename = this.onChangeFilename.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTags = this.onChangeTags.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        
        this.state = {
            filename: this.props.file.name,
            title: this.props.file.meta.title || '',
            description: this.props.file.meta.description || '',
            tags: this.props.file.meta.tags || '',
            isOpen: false,
        };
    }
    
    resetState() {
        this.setState({
            filename: this.props.file.name,
            title: this.props.file.meta.title || '',
            description: this.props.file.meta.description || '',
            tags: this.props.file.meta.tags || '',
            isOpen: false,
        });
    }
    
    toggleOpen() {
        this.setState({isOpen: !this.state.isOpen});
    }
    
    onChangeFilename(e) {
        this.setState({filename: e.target.value});
    }
    
    onChangeTitle(e) {
        this.setState({title: e.target.value});
    }
    
    onChangeDescription(e) { 
        this.setState({description: this.refs.description.state.value}); 
    }
    
    onChangeTags(e) {
        this.setState({tags: this.refs.tags.state.value});
    }
    
    handleCancel() {
        window.scrollTo(0, 0);
        this.resetState();
    }
    
    handleSave() {
        
    }
    
    render() {
        let style1 = {marginBottom: 20};
        let style2 = {width: '100%'};
        if (this.state.isOpen) {
            return (
                <form style={style1}>
                    <TextField floatingLabelText="File name" hintText='File name' onChange={this.onChangeFilename} 
                            value={this.state.filename} errorText="This field is required" style={style2} /><br/>
                    <TextField floatingLabelText="Title" hintText='title' onChange={this.onChangeTitle} 
                            value={this.state.title} style={style2} /><br/>
                    <br/>
                    <label class='formLabel' >Description</label><br/>
                    <MarkdownEditor ref='description' onContentChange={this.onChangeDescription} iconsSet="font-awesome" 
                            initialContent={this.state.description} />
                    <label class='formLabel' >Tags</label><br/>
                    <MarkdownEditor ref='tags' onContentChange={this.onChangeTags} iconsSet="font-awesome" 
                            initialContent={this.state.tags} /> <br/>
                    <FlatButton backgroundColor={grey200} hoverColor={grey300}
                        label="SAVE" labelPosition="right" primary={true}
                        style={{color: grey600, marginRight: '10px'}}
                        icon={<ContentSave color={grey600} style={styles.icon} />}
                        onClick={() => this.handleSave(this.props.id, {
                                filename: this.state.filename,
                                title: this.state.title,
                                description: this.state.description,
                                tags: this.state.tags,
                        })}
                    />  
                    <FlatButton backgroundColor={grey200} hoverColor={grey300}
                        label="CANCEL" labelPosition="right" primary={true}
                        style={{color: grey600, marginRight: '40px'}}
                        icon={<ContentClear color={grey600} style={styles.icon} />}
                        onClick={this.handleCancel}
                    />
                </form>
            )
        } else {
            return null;
        }
    }
}
