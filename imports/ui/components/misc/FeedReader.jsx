//http://vnexpress.net/rss/tin-moi-nhat.rss
import React from 'react';
import {httpGetAsync} from '../../utils';

export default class FeedReader extends React.Component {
    constructor(props) {
        super(props);
        this.getRssContent = this.getRssContent.bind(this);
        this.state = {
            rssContent: '',
        }
    }
    
    getRssContent(rssConent) {
        ReactDOM.render(<div>{rssContent}</div>, document.getElementById('feed-container'));
    }
    
    render() {
        let url = 'http://vnexpress.net/rss/tin-moi-nhat.rss';
        httpGetAsync(url, this.getRssContent);
        return <div id='feed-container'></div>;
    }
}