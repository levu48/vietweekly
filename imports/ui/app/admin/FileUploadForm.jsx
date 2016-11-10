import React from 'react';
import Dropzone from 'react-dropzone';
import {Files} from '../../../api/files';

export default class FileUploadForm extends React.Component {
    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
    }
    
    onDrop(files) {
        console.log('Received files: ', files);
        let upload = Files.insert({
            file: files[0],
            streams: 'dynamic',
            chunkSize: 'dynamic'
        }, false);
        
        upload.on('end', function(error, fileObj) {
            if (error) {
                alert('Error duing upload: ', error);
            } else {
                alert(`File ${fileObj.name} successfully uploaded`);
            }
        });
        
        upload.start();
    }
    
    render() {
        return (
            <div>
                <Dropzone onDrop={this.onDrop} >
                    <div>Try dropping some files here, or click to select files to upload</div>
                </Dropzone>
            </div>
        )
    }
}