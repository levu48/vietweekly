import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import querystring from 'querystring';
import {Resources} from '../../api/resources';
import google from '../../utils/google';
import {newPost, setContent} from '../actions/actions';
import {grey200, grey600, red500} from 'material-ui/styles/colors';
import ImageRemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import ActionVisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';
import styles from '../styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {BLOCKED_SITES, isBlocked} from '../../data/sites';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: styles.primary1Color,
    }
});

querystring.escape = function(str) {
    str = encodeURIComponent(str)
        .replace(/\*/g, '%2A')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/'/g, '%27');
    return str;
};

const style = {
    fontSize: 14
};

class GoogleSearch extends React.Component {
    constructor(props) {
        super(props);
        this.toggleHover = this.toggleHover.bind(this);
        this.search = this.search.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);
        this.state = {
            searchOpen: false,
            hovered: false,
        }
    }
    
    toggleHover() {
        this.setState({hovered: !this.state.hovered});
    }
    
    search(text) {
        Meteor.call('searchGoogle', text, (err, res) => {
            if (err) console.error(err)
            
            let arr = res.map((link = {}) => {
                let linkPost = {
                    _id: link._id,
                    postId: link.postId,
                    title: link.title || '',
                    subtitle: link.description || '',
                    hidden: isBlocked(link.link) ? true : link.hidden || false,
                    views: link.view || 0,
                    source: {
                        name: 'External web page',
                        link: link.link,
                        type: 'external',
                    }
                }
                
                if (Meteor.user() && Meteor.user().username === 'jsun246') {
                    return (
                        <li>
                            <span onClick={() => this.props.setContent(null, 'post', linkPost)} 
                                style={{cursor: 'pointer', color: linkPost.hidden ? grey600 : '#000' }}>
                                {linkPost.title} </span> ({linkPost.views}) 
                                { linkPost.hidden ? <ActionVisibilityOff color={red500} hoverColor={red500} style={styles.iconTiny} 
                                                            onTouchTap={(e) => {}} />
                                                : <ActionVisibility color={grey600} hoverColor={red500} style={styles.iconTiny} 
                                                            onTouchTap={(e) => {}} /> 
                                                }           
                                <ActionDelete style={styles.iconTiny} hoverColor={red500} 
                                        onTouchTap={() => {
                                            if (confirm(`Are you sure you want to delete the link with the title: ${linkPost.title} (id# ${linkPost._id})`)) {
                                                Meteor.call('resources.remove', linkPost._id);
                                            }
                                        }} />
                                <ActionNoteAdd style={styles.iconTiny} hoverColor={red500} 
                                        onTouchTap={() => {
                                                         this.props.newPost({
                                                                title: linkPost.title, 
                                                                subtitle: linkPost.subtitle,
                                                                text: linkPost.subtitle,
                                                                source: {
                                                                    name: 'Internet',
                                                                    link: linkPost.source.link,
                                                                    type: 'external',
                                                                }
                                                            });
                                                }} 
                                        />
                        </li>
                    )
                    
                } else if (linkPost.hidden) {
                    return null;
                    
                } else {
                    return (
                        <li>
                            <span onClick={() => this.props.setContent(null, 'post', linkPost)} style={{cursor: 'pointer'}}>
                                {linkPost.title}
                            </span>
                        </li>
                    )
                }
            });
            
            let comp =  <MuiThemeProvider muiTheme={styles.muiTheme}><ul style={style}>{arr}</ul></MuiThemeProvider>;
            ReactDOM.render(comp, document.getElementById('result_' + this.props.post._id));
        });
    }
    
    toggleSearch() {
        this.setState({searchOpen: !this.state.searchOpen});
    }

    
    render() {
         if (this.state.searchOpen) {
            this.search(this.props.searchText);
        } else {
            if (document.getElementById('result_' + this.props.post._id)) {
                ReactDOM.render(<span/>, document.getElementById('result_' + this.props.post._id));
            }
        }  
        return (
            <div>
                <div id={'result_' + this.props.post._id} ></div>
            </div>
        );
    }
}

export default GoogleSearch