import PostModel from '../../api/PostModel';
import {httpGetAsync, processYouTubeVideos} from '../../utils';

export const DISPLAY_POST_FORM = 'DISPLAY_POST_FORM';
export const NEW_POST = 'NEW_POST';
export const SAVE_POST = 'SAVE_POST';
export const SAVE_NEW_POST = 'SAVE_NEW_POST';
export const LIST_POSTS = 'LIST_POSTS';
export const CANCEL_POST_FORM = 'CANCEL_POST_FORM';
export const CANCEL_NEW_POST = 'CANCEL_NEW_POST';
export const CANCEL_POST = 'CANCEL_POST';
export const SHOW_POST = 'SHOW_POST';
export const EDIT_POST = 'EDIT_POST';
export const SAVE_EDIT_POST = 'SAVE_EDIT_POST';
export const CANCEL_EDIT_POST = 'CANCEL_EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const TEST = 'TEST';

export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_CONTENT= 'SET_CONTENT';
export const SET_NAV_DRAWER = 'SET_NAV_DRAWER';

export const SET_RATING = 'SET_RATING';
export const SET_PAGE = 'SET_PAGE';
export const LOAD_PAGE = 'LOAD_PAGE';
export const LOAD_ADMIN_PAGE = 'LOAD_ADMIN_PAGE';
export const LOAD_VIDEOS = 'LOAD_VIDEOS';
export const SPECIAL_POSTS = 'SPECIAL_POSTS';
export const LIST_FILES = 'LIST_FILES';
export const FILE_UPLOAD = 'FILE_UPLOAD';
export const DELETE_FILE = 'DELETE_FILE';
export const SEARCH_GOOGLE = 'SEARCH_GOOGLE';
export const YOUTUBE_UPLOAD = 'YOUTUBE_UPLOAD';

export function displayPostForm() {
    return {
        type: DISPLAY_POST_FORM
    }
}

export function printTest(text) {
    return {
        type: TEST,
        text: text,
    }
}

export function savePost(postId) {
    return {
        type: SAVE_POST,
        postId: postId,
    }
}

export function saveNewPost(postId) {
    return {
        type: SAVE_NEW_POST,
        postId: postId,
    }
}

export function newPost(params = null) {
    return {
        type: NEW_POST,
        params: params,
    }
}

export function cancelNewPost() {
    return {
        type: CANCEL_NEW_POST
    }
}

export function cancelPost(postId) {
    return {
        type: CANCEL_POST,
        postId: postId,
    }
}

export function showPost(postId) {
    return {
        type: SHOW_POST,
        postId: postId,
    }
}

export function editPost(postId, page = 'unknown') {
    return {
        type: EDIT_POST,
        postId: postId,
        page: page,
    }
}

export function deletePost(postId) {
    Meteor.call('posts.remove', postId);
    return {
        type: DELETE_POST,
        postId: postId,
    }
}

export function listPosts() {
    return {
        type: LIST_POSTS
    }
}

// front page

export function setCategory(category) {
    return {
        type: SET_CATEGORY,
        category: category
    }
}

export function setContent(id, contentType, content) {
    Meteor.call('posts.increaseViewsByOne', id);
    return {
        type: SET_CONTENT,
        contentId: id,
        contentType: contentType,
        content: content,
    }
}

export function setRating(id, rating, ratingCount, newRating) {
    Meteor.call('posts.setRating', id, rating, ratingCount, newRating);
    return {
        type: SET_RATING,
        contentId: id,
        rating,
    }
}

// navDrawer
export function setNavDrawer(flag) {
    return {
        type: SET_NAV_DRAWER,
        displayNavDrawer: flag
    }
}

export function setPage(page) {
    return {
        type: SET_PAGE,
        page: page
    }
}

export function loadPage(pageType) {
    return {
        type: LOAD_PAGE,
        pageType: pageType
    }
}

export function loadAdminPage() {
    return {
        type: LOAD_ADMIN_PAGE
    }
}

export function loadVideos(playlistId) {
    //let url = "https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&part=snippet%2CcontentDetails%2Cstatus&key=AIzaSyBDyBloG5RR8lXQGJ5wPlnZF1x073VP0AQ&playlistId=UU9Lg84hU2f7KLIb6aqj63Jg";
    let url = "https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&part=snippet%2CcontentDetails%2Cstatus&key=AIzaSyBDyBloG5RR8lXQGJ5wPlnZF1x073VP0AQ&playlistId="
            + playlistId;
    httpGetAsync(url, processYouTubeVideos);        
    return {
        type: LOAD_VIDEOS,
        playlistId: playlistId
    }
}

export function specialPosts() {
    return {
        type: SPECIAL_POSTS
    }
}

export function listFiles() {
    return {
        type: LIST_FILES
    }
}

export function fileUpload() {
    return {
        type: FILE_UPLOAD
    }
}

export function deleteFile(id) {
    Meteor.call('files.remove', id);
    return {
        type: DELETE_FILE,
        fileId: id,
    }
}

export function searchGoogle(searchText) {
    return {
        type: SEARCH_GOOGLE,
        searchText: searchText,
    }
}

export function youtubeUpload(filePath) {
    Meteor.call('youtubeUpload', filePath);
    return {
        type: YOUTUBE_UPLOAD,
        filePath: filePath,
    }
}
