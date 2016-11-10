import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CommunicationComment from 'material-ui/svg-icons/communication/comment';
import ImageRemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import {red500, grey500} from 'material-ui/styles/colors';
import styles from '../styles';

export default class YtVideo extends React.Component {    
    
	render() {
        const {contentId} = this.props;
        const {title, subtitle, description} = this.props.content;
        
		var str = "http://www.youtube.com/embed/" + contentId
			+ "?wmode=transparent&autoplay=0&amp;origin=&amp;modestbranding=0&amp;showinfo=0"
			+ "&amp;cc_lang_pref=vi&amp;hl=vi_VI&amp;fs=1&amp;cc_load_policy=1";

		return (
            <Card {...this.props} >
                <CardMedia>
                    <iframe id="ytplayer" type="text/html" width={'100%'} height={340}
                    src={str} frameBorder="0" allowFullScreen></iframe>
                </CardMedia>
                <CardTitle title={title} subtitle={subtitle} />
                <CardText>{description}</CardText>
                <CardActions>
                    <CommunicationComment style={styles.icon} color={grey500} /> 
                    <ImageRemoveRedEye style={styles.icon} color={grey500} />
                </CardActions>
            </Card>
		);
	}
}
