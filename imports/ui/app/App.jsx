import React from 'react';
import {connect} from 'react-redux';
import {$} from 'meteor/jquery';
import {setCategory, setNavDrawer, setContent, setPage} from '../actions/actions';
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
import RightColumn from './RightColumn.jsx';
import styles from '../styles/style2';
import Heading from '../components/Heading.jsx';
import Post from '../components/Post.jsx';
import PostList from '../components/PostList.jsx';
import PostModel from '../../api/PostModel';
import {Posts} from '../../api/posts';
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
    selected: 'Chọn lọc',
    document: 'Tài liệu',
    opinion: 'Bình luận',
    video: 'Video',
    rss: 'RSS',
    vietnam: 'Việt Nam',
    america: 'Hoa Kỳ',
    world: 'Thế giới',
    overseas: 'Hải ngoại',
    usElection: 'Bầu cử Mỹ 2016',
    eastSea: 'Biển Đông',
    english: 'General News',
    englishSelected: 'Selected',
    englishWorld: 'World',
    englishUs: 'United States',
    englishVietnam: 'Vietnam',
    englishEastSea: 'East Sea',
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
        let webPageUrl = this.props.content == null 
                ? 'http://vnexpress.net/tin-tuc/thoi-su/da-nang-quyet-phuong-an-mo-cua-hut-gio-cho-toa-nha-2-000-ty-3452215.html'
                : this.props.content.source.link ;
        return (
            <MuiThemeProvider muiTheme={styles.muiTheme}>
                <div>
                    <div>
                        <TopBar {...this.props} style={styles.topBar} />
                        <div style={{ position: 'absolute', top: 68,
                                    width: 360, height: 'calc(100% - 68px)',
                                    overflowY: 'auto', overflowX: 'hidden',
                                    WebkitScrollbar: { width: '1px'},
                                    borderRight: '1px solid #ddd',
                                }}>
                            <Heading text={TermDict[this.props.category]} />
                            <ContentListing handleSetItem={this.handleSetItem} />
                        </div>
                    </div>
                    <RightColumn {...this.props} />
                    <NavDrawer ref={(ref) => this.navDrawer = ref} {...this.props} docked={true} />
                </div>
            </MuiThemeProvider>
        )
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
        contentId: state.contentId,
        contentType: state.contentType,
        content: state.content,
        category: state.category,
        editPostId: state.editPostId,
        editState: state.editState,
        page: state.page,
    }
}

mapDispatchToProps = (dispatch) => {
    return {
        toggleNavDrawer: () => dispatch(toggleNavDrawer()),
        setContent: (id, contentType, content) => dispatch(setContent(id, contentType, content)),
        setPage: (page) => dispatch(setPage(page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeteorApp);
