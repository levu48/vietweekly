import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import SocialPerson from 'material-ui/svg-icons/social/person';
import {white, lightBlue600, grey500} from 'material-ui/styles/colors';
import Blaze from 'meteor/gadicc:blaze-react-component';
import AccountsUI from '../components/AccountsUI.jsx';
import styles from '../styles';


class TopBar extends React.Component {
    render() {
        return (
            <AppBar {...this.props} 
                    title ={<div className='plain'>
                                <img height='40px' src='/images/site/logo.png' style={{marginTop: '15px', cursor: 'pointer'}} 
                                        onClick={() => {
                                                this.props.setPage('unknown');
                                                this.props.setContent(null, null, null)
                                            }}
                                        /></div>}
                    onLeftIconButtonTouchTap={this.props.toggleNavDrawer}
                    zDepth={2}
                    iconElementRight={<SocialPerson onClick={() => window.location.href='/#/admin'} 
                            style={{marginTop: 10, marginRight: 20, cursor: 'pointer'}} hoverColor={grey500}
                            color={this.props.userColor} 
                    />}
                    showMenuIconButton={true}
            />
        );
    }
}

export default createContainer(() => {
    return {
        userColor: Meteor.user() ? lightBlue600 : white
    }
}, TopBar);