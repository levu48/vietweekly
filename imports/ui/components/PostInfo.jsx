import React from 'react';
import {markdown} from 'markdown';
import ReactMarkdown from 'react-markdown';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CommunicationComment from 'material-ui/svg-icons/communication/comment';
import ImageRemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionLaunch from 'material-ui/svg-icons/action/launch';
import ContentSave from 'material-ui/svg-icons/content/save';
import ContentClear from 'material-ui/svg-icons/content/clear';
import {red500, grey500, grey200, grey300, grey600} from 'material-ui/styles/colors';
import HorizontalCard from './HorizontalCard.jsx';
import styles from '../styles';
import PostModel from '../../api/PostModel';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Subheader from 'material-ui/Subheader';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ToggleStar from 'material-ui/svg-icons/toggle/star';

import Checkbox from 'material-ui/Checkbox';
    


export default class PostInfo extends React.Component {
    constructor(props) {
        super(props);
        this.calcHeight = this.calcHeight.bind(this);
        this.externaLinkFunction = this.externalLinkFunction.bind(this);
        this.isExternalReady = this.isExternalReady.bind(this);
    }
    
   
    calcHeight() {
        return this.props.heightFactor * 120;
    }
    
    externalLinkFunction() {
        if (this.isExternalReady()) {
            return () => this.props.setExternalContent(this.props.data.source.link, this.props.data.source.name);
        }
        return () => {};
    }
    
    isExternalReady() {
        if (this.props.data.source.link && this.props.setExternalContent) {
            return true;
        }
        return false;
    }
        
    render() {
        return (
            <HorizontalCard {...this.props} style={Object.assign(styles.horizontalStyle, this.props.style)} >
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap'}}>
               
                    <CardMedia type='CardMedia' style={{flex: this.props.partition[0], width: '200px'}} > 
                        <img src={this.props.data.getImage()} style={{width: '200px', cursor: 'pointer'}} onClick={this.externalLinkFunction()} />
                    </CardMedia>

                    <div style={{flex: this.props.partition[1]}}>
                        <CardTitle type='CardTitle' title={this.props.data.title} 
                                subtitle='Lời bình dẫn của Đông Duy' titleStyle={{lineHeight: '28px'}}
                                onClick={this.externalLinkFunction()} style={{cursor: 'pointer'}}
                                />
                        <CardText><ReactMarkdown source={this.props.data.editorial} />
                                <span style={{color: grey500}}>id#: {this.props.data._id}</span></CardText>
                        <CardActions type='CardActions'
                                actAsExpander={true}
                                showExpandableButton={true}
                            >
                            <FlatButton backgroundColor={grey200} hoverColor={grey300}
                                label="12" labelPosition="right"
                                primary={true} style={{color: grey600, marginRight: '10px'}}
                                icon={<CommunicationComment color={grey600} style={styles.icon} />}
                                onTouchTap={(e) => {}}
                            />
                            <FlatButton backgroundColor={grey200} hoverColor={grey300}
                                label="235" labelPosition="right"
                                primary={true} style={{color: grey600, marginRight: '10px'}}
                                icon={<ImageRemoveRedEye color={grey600} style={styles.icon} />}
                                onTouchTap={(e) => {}}
                            />
                             <FlatButton backgroundColor={grey200} hoverColor={grey300}
                                label="4.2" labelPosition="right"
                                primary={true} style={{color: grey600, marginRight: '10px'}}
                                icon={<ToggleStar color={grey600} style={styles.icon} />}
                                onTouchTap={(e) => {}}
                            />
                            <FlatButton backgroundColor={grey200} hoverColor={grey300}
                                label="BẢN TIN" labelPosition="right"
                                primary={true} style={{color: grey600, marginRight: '10px'}}
                                icon={<ActionLaunch color={grey600} style={styles.icon} />}
                                onTouchTap={this.externalLinkFunction()}
                            />
                        </CardActions>
                    </div>
                </div>
            </HorizontalCard>
        );
    }
    
}

PostInfo.propTypes = { 
    data: React.PropTypes.object,
    style: React.PropTypes.object,
    partition: React.PropTypes.array,
    orientation: React.PropTypes.string,
    mode: React.PropTypes.string,
    heightFactor: React.PropTypes.number,
    width: React.PropTypes.string,
    handleSetMode: React.PropTypes.function,
};

PostInfo.defaultProps = { 
    data: new PostModel({
        title: 'Post title',
        subtitle: 'Post subtitle',
        editorial: 'Post editorial',
        text: 'Post text',
        images: ['https://static.pexels.com/photos/1562/italian-landscape-mountains-nature-large.jpg'],
        videos: ['mtqOUd5Ds-E'],
        author: '',
        source: '',
    }),
    style: {},
    partition: [1,2],
    orientation: 'vertical',
    mode: 'image',
    heightFactor: 1,
    width: '100%',
    handleSetMode: () => {},
};