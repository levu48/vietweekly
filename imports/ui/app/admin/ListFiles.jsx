import React from 'react';
import {connect} from 'react-redux';
import {createContainer} from 'meteor/react-meteor-data';
import {deleteFile, youtubeUpload} from '../../actions/actions';
import {Files} from '../../../api/files';
import FileUploadForm from './FileUploadForm.jsx';
import {List} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ImageListItem from '../../components/ImageListItem.jsx';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import AvSubscriptions from 'material-ui/svg-icons/av/subscriptions';
import styles from '../../styles';
import {red500} from 'material-ui/styles/colors';
import FileEditForm from '../../components/FileEditForm.jsx';

class ListFiles extends React.Component {  
    constructor(props) {
        super(props);
        this.displayFiles = this.displayFiles.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
    }
    
    toggleEdit(refId) {
        this.refs[refId].toggleOpen();
    }
    
    
    displayFiles() {
        let arr = this.props.files.map((f) => {
            return (<div>
                    <ImageListItem primaryText={f.name} secondaryTextLines={0} 
                            info={<div style={styles.smallIconsDiv}>
                                       <span onClick={() => this.toggleEdit(f._id)} style={{cursor: 'pointer'}}>
                                                <EditorModeEdit style={styles.icon_listFiles} hoverColor={red500} />edit</span>
                                       <span onClick={() => {
                                                    if (confirm(`Are you sure you want to delete the file with name "${f.name}"?`)) {
                                                        this.props.deleteFile(f._id);
                                                    }
                                                }} style={{cursor: 'pointer'}}>
                                                <ActionDelete style={styles.icon_listFiles} hoverColor={red500} />delete</span>
                                       <span style={{cursor: 'pointer'}}
                                                onClick={() => {
                                                    this.props.youtubeUpload(f.path);
                                                    alert(`Uploading file ${f.name} (${f.path}) to Youtube ...`);
                                                    console.log("FILE", f);
                                                }}
                                                >
                                                <AvSubscriptions style={styles.icon_listFiles} hoverColor={red500} />push to YouTube</span>
                                    </div>}
                            />
                     <FileEditForm ref={f._id} file={f} />
                    <Divider/>
                </div>);
        });
        
        return arr;
    }
    
    render() {
        return (
            <div>
                <FileUploadForm />
                <List>
                    <Divider />
                    {this.displayFiles()}
                </List>
            </div>
        );
    }
      
}

let meteorContainer = createContainer(() => {
    return {
        files: Files.find({}).fetch()
    }
}, ListFiles);

mapDispatchToProps = (dispatch) => {
    return {
        deleteFile: (id) => dispatch(deleteFile(id)),
        youtubeUpload: (filePath) => dispatch(youtubeUpload(filePath)),
    }
}

export default connect(() => {return {}}, mapDispatchToProps)(meteorContainer);

