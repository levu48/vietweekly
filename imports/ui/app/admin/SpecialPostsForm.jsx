import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Card, CardHeader, CardMedia, CardTitle, CardText, CardActions} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import ContentSave from 'material-ui/svg-icons/content/save';
import ContentClear from 'material-ui/svg-icons/content/clear';
import FlatButton from 'material-ui/FlatButton';
import {red500, grey500, grey200, grey300, grey600} from 'material-ui/styles/colors';
import styles from '../../styles';
import {SpecialPosts} from '../../../api/specialPosts';

class SpecialPostsForm extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeText = this.onChangeText.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state ={
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
            '6': '',
            '7': '',
            '8': '',
            '9': '',
            '10': '',
        }
        
        if (this.props.specialPosts) {
            this.state = this.props.specialPosts;
        }
    }
    
    onChangeText(e, indexStr) {
        let obj = {};
        obj[indexStr] = e.target.value;
        this.setState(obj);
        console.log("CHANGE TEXT", e.target.value, this.state);
    }
    
    handleSave() {
        Meteor.call('specialPosts.upsert', this.state);
        window.scrollTo(0, 0);
    }
    
    render() {
        return (
            <Card {...this.props} style={{padding: 10, width: '100%'}}>
                <CardTitle title='Special Posts' />
                <form>
                    <TextField floatingLabelText="Post #1" hintText="Post title"  value={this.state['1']} onChange={(e) => this.onChangeText(e, '1')} fullWidth={true} /><br />
                    <TextField floatingLabelText="Post #2" hintText="Post title"  value={this.state['2']} onChange={(e) => this.onChangeText(e, '2')} fullWidth={true} /><br />
                    <TextField floatingLabelText="Post #3" hintText="Post title"  value={this.state['3']} onChange={(e) => this.onChangeText(e, '3')} fullWidth={true} /><br />
                    <TextField floatingLabelText="Post #4" hintText="Post title"  value={this.state['4']} onChange={(e) => this.onChangeText(e, '4')} fullWidth={true} /><br />
                    <TextField floatingLabelText="Post #5" hintText="Post title"  value={this.state['5']} onChange={(e) => this.onChangeText(e, '5')} fullWidth={true} /><br />
                    <TextField floatingLabelText="Post #6" hintText="Post title"  value={this.state['6']} onChange={(e) => this.onChangeText(e, '6')} fullWidth={true} /><br />
                    <TextField floatingLabelText="Post #7" hintText="Post title"  value={this.state['7']} onChange={(e) => this.onChangeText(e, '7')} fullWidth={true} /><br />
                    <TextField floatingLabelText="Post #8" hintText="Post title"  value={this.state['8']} onChange={(e) => this.onChangeText(e, '8')} fullWidth={true} /><br />
                    <TextField floatingLabelText="Post #9" hintText="Post title"  value={this.state['9']} onChange={(e) => this.onChangeText(e, '9')} fullWidth={true} /><br />
                    <TextField floatingLabelText="Post #10" hintText="Post title"  value={this.state['10']} onChange={(e) => this.onChangeText(e, '10')} fullWidth={true} /><br />
                </form>
                 <CardActions type='CardActions'>
                        <FlatButton
                                backgroundColor={grey200}
                                hoverColor={grey300}
                                label="SUBMIT"
                                labelPosition="right"
                                primary={true}
                                style={{color: grey600, marginRight: '10px'}}
                                icon={<ContentSave color={grey600} style={styles.icon} />}                    
                                onClick={this.handleSave}
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

export default createContainer(() => {
    return {
        specialPosts: SpecialPosts.findOne({})
    }
}, SpecialPostsForm);