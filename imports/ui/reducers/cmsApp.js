import {Meteor} from 'meteor/meteor';
import {displayPostForm, printTest, DISPLAY_POST_FORM, CANCEL_POST, CANCEL_NEW_POST,
    NEW_POST, SAVE_POST, SAVE_NEW_POST, EDIT_POST, DELETE_POST, LIST_POSTS, SPECIAL_POSTS, SHOW_POST,
    SET_CATEGORY, SET_CONTENT, SET_NAV_DRAWER, SET_PAGE, LOAD_PAGE, LOAD_ADMIN_PAGE, LIST_FILES, 
    FILE_UPLOAD, DELETE_FILE, SEARCH_GOOGLE, YOUTUBE_UPLOAD} 
    from '../actions/actions';

const initialState = {
    cmd: null,
    params: null,
    category: 'news',
    contentId: null,
    contentType: null,
    content: null,
    mainPostId: null,
    editPostId: null,
    editState: 'unknown',
    page: 'unknown',
    displayNavDrawer: false,
    pageCount: {
        news: 1,
        video: 1,
        opinion: 1,
    },
    admin: {
        pageCount: 1
    }
}

function addPage(state, pageType) {
    const obj = {};
    obj[pageType] = state.pageCount[pageType] + 1;
    return obj;
}

function cmsApp(state = initialState, action) {
    
    switch (action.type) {
        case DISPLAY_POST_FORM:
            return Object.assign({}, state, {cmd: action.type, editState: 'display'});
        
        case NEW_POST:
            return Object.assign({}, state, {cmd: action.type, params: action.params, editState: 'new', editPostId: null});
            
        case CANCEL_NEW_POST:
            return Object.assign({}, state, {cmd: action.type, editState: 'list', editPostId: null});
            
        case CANCEL_POST:
            return Object.assign({}, state, {cmd: action.type, editState: 'show', editPostId: action.postId});
                
        case SAVE_POST:
            return Object.assign({}, state, {cmd: action.type, editState: 'show', editPostId: action.postId});
            
        case SAVE_NEW_POST:
            return Object.assign({}, state, {cmd: action.type, editState: 'show', editPostId: action.postId});
            
        case SHOW_POST:
            return Object.assign({}, state, {cmd: action.type, editState: 'show', editPostId: action.postId});
            
        case DELETE_POST:
            return Object.assign({}, state, {cmd: action.type, editState: 'list', editPostId: null});
            
        case EDIT_POST:
            return Object.assign({}, state, {cmd: action.type, editState: 'edit', editPostId: action.postId, page: action.page});
            
       case SPECIAL_POSTS:
            return Object.assign({}, state, {cmd: action.type, editState: 'specialPosts'});
        
        case LIST_POSTS:
            return Object.assign({}, state, {cmd: action.type, editState: 'list', editPostId: null});
        
        case SET_CATEGORY:
            return Object.assign({}, state, {cmd: action.type, category: action.category});
            
        case SET_CONTENT:
            return Object.assign({}, state, {cmd: action.type, contentId: action.contentId, contentType: action.contentType, content: action.content});
        
        case SET_NAV_DRAWER:
            return Object.assign({}, state, {cmd: action.type, displayNavDrawer: action.displayNavDrawer});
        
        case SET_PAGE:
            return Object.assign({}, state, {cmd: action.type, page: action.page});
            
        case LOAD_PAGE:
            return Object.assign({}, state, {cmd: action.type, pageCount: Object.assign({}, state.pageCount, addPage(state, action.pageType))});
        
        case LOAD_ADMIN_PAGE:
            return Object.assign({}, state, {cmd: action.type, admin: Object.assign({}, state.admin, {pageCount: state.admin.pageCount + 1})});
            
        case LIST_FILES: 
            return Object.assign({}, state, {cmd: action.type, editState: 'listFiles'});
       
        case FILE_UPLOAD:
            return Object.assign({}, state, {cmd: action.type, editState: 'fileUpload'});
            
        case SEARCH_GOOGLE:
            return Object.assign({}, state, {cmd: action.type, contentType: 'search', searchText: action.searchText});
            
        case YOUTUBE_UPLOAD:
            return Object.assign({}, state, {cmd: action.type, filePath: action.filePath});
             
        default:
            return Object.assign({}, state, {cmd: action.type});
    }
}

export default cmsApp;