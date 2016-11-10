import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {spacing, typography, zIndex} from 'material-ui/styles';
import {cyan500, gray200} from 'material-ui/styles/colors';
import {GridList, GridTile} from 'material-ui/GridList';
import {List} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ImageListItem from './ImageListItem.jsx';
import {httpGetAsync} from '../../utils';

const styles = {
  logo: {
    cursor: 'pointer',
    fontSize: 24,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: cyan500,
    paddingLeft: spacing.desktopGutter,
    marginBottom: 8,
  },
  
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  
  gridList: {
    width: 900,
    //height: 500,
    overflowY: 'auto',
    marginBottom: 24,
  },
  
  titleBackground: {
    height: 10,
  }
};

const YtChannel = React.createClass({
    childContextTypes:{
        muiTheme: React.PropTypes.object.isRequired,
    },
    
    getChildContext: function() {
        return {muiTheme: getMuiTheme()};
    },
   

	displayYouTubeVideos: function(responseText) {
		var {setMainVideo, ...others} = this.props;

		var obj = JSON.parse(responseText);
		var items = obj.items;

		var videos = items.map((item) => {
			var newItem = {
                mode: 'video',
				videoId: item.snippet.resourceId.videoId,
                videos: [item.snippet.resourceId.videoId],
				title: item.snippet.title,
                subtitle: item.snippet.channelTitle + ', ' + item.snippet.publishedAt,
				description: item.snippet.description,
				source: item
			};
            
			return (
                <div>
                    <ImageListItem key={newItem.videoId} 
            			    leftAvatar={<img width={100} src={newItem.source.snippet.thumbnails.medium.url} />}
                            primaryText={newItem.title}
                            secondaryText={newItem.description}
                            secondaryTextLines={2}
                            onTouchTap={() => this.props.setContent(newItem.videoId, 'video', newItem)}
                            />
                    <Divider/>
                </div>
            );
		});        
                   
		ReactDOM.render(
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div style={styles.root}>
                    <List>
                        {videos}
                    </List>
                </div>
            </MuiThemeProvider>
        , document.getElementById("vw-youtube-videos"));
	},

	render: function() {
		var VW_URL = "https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&part=snippet%2CcontentDetails%2Cstatus&playlistId=UU9Lg84hU2f7KLIb6aqj63Jg&key=AIzaSyBDyBloG5RR8lXQGJ5wPlnZF1x073VP0AQ";
		httpGetAsync(VW_URL, this.displayYouTubeVideos);
		
		return (<div id="vw-youtube-videos"></div>);
	}
});

export default YtChannel;

