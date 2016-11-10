import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {httpGetAsync} from '../utils'

export default class ReutersRss extends React.Component {
    getRss(responseText) {
        ReactDOM.render(<div>{responseText}</div>, document.getElementById('displayRss'));
    }
    
    render() {
        let url2 = 'http://feeds.reuters.com/reuters/topNews';
        let url3 = 'http://hosted2.ap.org/atom/APDEFAULT/3d281c11a96b4ad082fe88aa0db04305';
        let url = 'http://www.theguardian.com/world/rss';
        
        //httpGetAsync(url, this.getRss);
        let responseText = ''; //Meteor.call('readRss', url);
        return (
            <div id='displayRss'>ReuterRss: {responseText}</div>
        )
    }
}