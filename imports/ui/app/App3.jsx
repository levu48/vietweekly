import React from 'react';
import {connect} from 'react-redux';
import {$} from 'meteor/jquery';
import {setCategory, setNavDrawer} from '../actions/actions';
import {createContainer} from 'meteor/react-meteor-data';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue900, lightBlue900, cyan900, cyan700, grey50, grey200, grey600, white, darkWhite} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import {GridList, GridTile} from 'material-ui/GridList';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import TopBar from './TopBar.jsx';
import NavDrawer from './NavDrawer.jsx';
import styles from '../styles';
import Heading from '../components/Heading.jsx';
import Post from '../components/Post.jsx';
import PostList from '../components/PostList.jsx';
import PostModel from '../../api/PostModel';
import {Posts} from '../../api/posts';
import NewsList from '../components/NewsList.jsx';
import DocumentList from '../components/DocumentList.jsx';
import OpinionList from '../components/OpinionList.jsx';
import YtChannel from '../components/YtChannel.jsx';
import WebPage from '../components/WebPage.jsx';
import testPosts from '../../data/testPosts';
import MainDisplay from './MainDisplay.jsx';
import ContentListing from './ContentListing.jsx';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: styles.primary1Color,
    }
});

const TermDict = {
    news: 'Tin tức',
    document: 'Tài liệu',
    opinion: 'Bình luận',
    video: 'Video',
    rss: 'RSS',
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.mainDisplay = null;
        this.navDrawer = null;
        this.handleSetItem = this.handleSetItem.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.state = {
            category: 'news',
            mainPost: testPosts[0]
        };
    }
    
    handleSetItem(obj) {
        this.mainDisplay.scrollTop = 0;
        this.setState({mainPost: obj}); 
    }
    
    changeCategory(cat) {
        this.mainDisplay.scrollTop = 0;
        this.setState({category: cat});
    }
    
    render() {
        console.log("JQUERY WINDOW", $(window).width(), $(window).height());
        
        return (
            <MuiThemeProvider muiTheme={styles.muiTheme}>
                <div style={{marginTop: 0}}>
                    <TopBar style={styles.topBar} toggleNavDrawer={this.props.toggleNavDrawer} />
                    <div style={styles.papers}>
                        <div className='channel' >
                            <Paper style={styles.leftColumn} zDepth={1}>
                                <Heading text={TermDict[this.props.category]} />
                                <ContentListing handleSetItem={this.handleSetItem} />
                            </Paper>
                        </div>
                        <div ref={(ref) => this.mainDisplay = ref} style={styles.rightColumnDiv} >
                            <Paper style={styles.rightColumn} zDepth={0}>
                                <MainDisplay {...this.props} />
                                <Post data={new PostModel(this.state.mainPost)} style={{width: styles.mainDisplayWidth, marginTop: '0'}} 
                                            orientation={this.state.mainPost.extras.orientation} partition={[1,3]}
                                            heightFactor='2'
                                            mode='image'/>
                            </Paper>
                        </div>
                    </div>
                    <NavDrawer ref={(ref) => this.navDrawer = ref} {...this.props} docked={true} />
                </div>
            </MuiThemeProvider>
        );
    }
}

// read data from MongoDB and make available to App as property this.props.posts
let MeteorApp = createContainer(() => {
    return { posts: Posts.find({}).fetch() }
}, App);

function toggleNavDrawer() {
    return (dispatch, getState) => {
        if (getState().displayNavDrawer) {
            dispatch(setNavDrawer(false));
        } else {
            dispatch(setNavDrawer(true));
        }
    }
}

mapStateToProps = (state) => {
    return {
        category: state.category
    }
}

mapDispatchToProps = (dispatch) => {
    return {
        toggleNavDrawer: () => dispatch(toggleNavDrawer())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeteorApp);
