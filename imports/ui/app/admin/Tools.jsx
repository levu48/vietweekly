import React from 'react';
import {Meteor} from 'meteor/meteor';
import {connect} from 'react-redux';
import {newPost, listPosts, loadVideos, specialPosts, listFiles, fileUpload} from '../../actions/actions';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ContentAddBox from 'material-ui/svg-icons/content/add-box';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ImageFilterNone from 'material-ui/svg-icons/image/filter-none';
import CommunicationRssFeed from 'material-ui/svg-icons/communication/rss-feed';
import ContentDeleteSweep from 'material-ui/svg-icons/content/delete-sweep';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import FileUpload from 'material-ui/svg-icons/file/file-upload';

class Tools extends React.Component {
    render() {
        return (
            <List>
                <ListItem primaryText='Create a new post' leftIcon={<ContentAddBox />} 
                        onClick={this.props.newPost} />
                <ListItem primaryText='List existing posts' leftIcon={<ImageFilterNone />} 
                        onClick={this.props.listPosts} />
                <ListItem primaryText='Update RSS feeds' leftIcon={<CommunicationRssFeed />} 
                        onClick={() => {
                             if (confirm('Are you sure to update Vietnamese RSS entries?')) {
                                Meteor.call('rss.update', 'http://vnexpress.net/rss/tin-moi-nhat.rss');
                                Meteor.call('rss.update', 'http://vnexpress.net/rss/the-gioi.rss', ['rss', 'world']);
                                Meteor.call('rss.update', 'http://vnexpress.net/rss/thoi-su.rss');
                                Meteor.call('rss.update', 'http://vietnamnet.vn/rss/phap-luat.rss');
                                Meteor.call('rss.update', 'http://dantri.com.vn/trangchu.rss');
                                Meteor.call('rss.update', 'http://dantri.com.vn/the-gioi.rss');
                                Meteor.call('rss.update', 'http://dantri.com.vn/the-thao/the-thao-quoc-te.rss');
                                Meteor.call('rss.update', 'http://dantri.com.vn/the-gioi/chau-my.rss');
                             }
                        }} />
                 
               <ListItem primaryText='Update The English RSS feeds' leftIcon={<CommunicationRssFeed />} 
                        onClick={() => {
                             if (confirm('Are you sure to update English RSS entries?')) {
                                Meteor.call('rss.update', 'http://feeds.bbci.co.uk/news/rss.xml', ['rss', 'english', 'bbc']);
                                Meteor.call('rss.update', 'http://feeds.bbci.co.uk/news/world/rss.xml', ['rss', 'englishWorld', 'bbc']);
                                Meteor.call('rss.update', 'http://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml', ['rss', 'english', 'englishArts', 'bbc']);
                                //Meteor.call('rss.update', 'https://www.yahoo.com/news/rss?ref=gs', ['rss', 'english', 'yahoo']);
                                //Meteor.call('rss.update', 'http://rss.upi.com/news/news.rss', ['rss', 'english', 'upi']);
                                Meteor.call('rss.update', 'http://www.wsj.com/xml/rss/3_7085.xml', ['rss', 'english', 'wsj']);
                             }
                        }} />
                 
               <ListItem primaryText='Delete all RSS feeds' leftIcon={<ContentDeleteSweep />} 
                        onClick={() => {
                            if (confirm('Are you sure to delete all RSS entries?')) {
                                Meteor.call('posts.removeByTags', ['rss']);
                            }
                        }} />
                <ListItem primaryText='Import YouTube videos' leftIcon={<ImageFilterNone />} 
                        onClick={this.props.loadVideos} />
                <ListItem primaryText='Delete all videos' leftIcon={<ContentDeleteSweep />} 
                        onClick={() => {
                            if (confirm('Are you sure to delete all videos?')) {
                                Meteor.call('posts.removeByTags', ['video']);
                            }
                        }} />
                <ListItem primaryText='Special Posts' leftIcon={<ActionFavorite />} onClick={this.props.specialPosts} />
                <ListItem primaryText='List uploaded files' leftIcon={<ImageFilterNone />} onClick={this.props.listFiles} />
                <ListItem primaryText='Upload files' leftIcon={<FileUpload />} onClick={this.props.fileUpload} />
            </List>
        );
    }
}

mapDispatchToProps = (dispatch) => {
    return {
        newPost: () => dispatch(newPost()),
        listPosts: () => dispatch(listPosts()),
        loadVideos: () => dispatch(loadVideos('UU9Lg84hU2f7KLIb6aqj63Jg')),
        specialPosts: () => dispatch(specialPosts()),
        listFiles: () => dispatch(listFiles()),
        fileUpload: () => dispatch(fileUpload()),
    }
}

export default connect(() => {return {}}, mapDispatchToProps)(Tools);