import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import Blaze from 'meteor/gadicc:blaze-react-component';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import TopBar from '../TopBar.jsx';
import Tools from './Tools.jsx';
import styles from '../../styles';
import Heading from '../../components/Heading.jsx';
import WorkingSpace from './WorkingSpace.jsx';
import {Posts} from '../../../api/posts';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        
        this.tools = {
            displayPostForm: this.displayPostForm.bind(this),
            listPosts: this.listPosts.bind(this)  
        };
        
        this.state = {
            action: ''
        }
    }
    
    displayPostForm() {
        this.setState({action: 'post-form-display'});
    }
    
    listPosts() {
        this.setState({action: 'list-posts'});
    }
    
    render() {
        return (
            <MuiThemeProvider muiTheme={styles.muiTheme}>
                <div style={{marginTop: 0}}>
                    <TopBar style={styles.topBar} toggleNavDrawer={() => {}} />
                    <div style={styles.papers}>
                        <div style={styles.leftColumn} >
                            <Paper  zDepth={1}>
                                <Heading text='User' />
                                <div style={{margin: '10px'}}>
                                    <Blaze template='loginButtons' style={{marginBottom: '20px'}} />
                                </div>
                            </Paper>
                            {!this.props.isAdmin ? null :  (
                                <Paper zDepth={1}>
                                    <Heading text='Tools' />
                                    {this.props.isAdmin ? <Tools tools={this.tools} /> : null}
                                </Paper>
                            )}
                        </div>
                        <div style={styles.rightColumn} >
                            <Paper style2={styles.rightColumn} zDepth={0}>
                                <Heading text='Working space' rightText={'posts: ' + this.props.posts.length} />
                                <WorkingSpace action={this.state.action} />
                            </Paper>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default createContainer(() => {
    return {
        posts: Posts.find({}).fetch(),
        isAdmin: Meteor.user() && Meteor.user().emails[0].address === 'jsun246@gmail.com' ? true : false
    }
}, Admin);