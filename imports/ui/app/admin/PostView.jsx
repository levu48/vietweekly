import React from 'react';
import {markdown} from 'markdown';
import ReactMarkdown from 'react-markdown';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CommunicationComment from 'material-ui/svg-icons/communication/comment';
import ImageRemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentSave from 'material-ui/svg-icons/content/save';
import ContentClear from 'material-ui/svg-icons/content/clear';
import {red500, grey500, grey200, grey300, grey600} from 'material-ui/styles/colors';
import HorizontalCard from '../../components/HorizontalCard.jsx';
import styles from '../../styles';
import PostModel from '../../../api/PostModel';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Subheader from 'material-ui/Subheader';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Checkbox from 'material-ui/Checkbox';
    


export default class PostView extends React.Component {
    constructor(props) {
        super(props);
        this.calcHeight = this.calcHeight.bind(this);
    }
    
   
    calcHeight() {
        return this.props.heightFactor * 120;
    }
    
        
    render() {
        return (
            <HorizontalCard {...this.props} style={Object.assign(styles.horizontalStyle, this.props.style)} >
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap'}}>
               
                    <CardMedia type='CardMedia' style={{flex: this.props.partition[0], width: '200px'}} > 
                        <img src={this.props.data.getImage()} style={{width: '200px'}}/>
                    </CardMedia>

                    <div style={{flex: this.props.partition[1]}}>
                        <CardTitle type='CardTitle' title={this.props.data.title} subtitle={this.props.data.subtitle} titleStyle={{lineHeight: '28px'}}/>
                        <CardText><ReactMarkdown source={this.props.data.text} />
                                <span style={{color: grey500}}>id#: {this.props.data._id}</span></CardText>
                        <CardActions type='CardActions'
                                actAsExpander={true}
                                showExpandableButton={true}
                            >
                            <FlatButton backgroundColor={grey200} hoverColor={grey300}
                                label="EDIT" labelPosition="right"
                                primary={true} style={{color: grey600, marginRight: '10px'}}
                                icon={<EditorModeEdit color={grey600} style={styles.icon} />}
                                onTouchTap={(e) => this.props.editPost(this.props.data._id)}
                            />
                            <FlatButton backgroundColor={grey200} hoverColor={grey300}
                                label="DELETE" labelPosition="right"
                                primary={true} style={{color: grey600, marginRight: '10px'}}
                                icon={<ActionDelete color={grey600} style={styles.icon} />}
                                onTouchTap={(e) => {
                                            e.preventDefault();
                                            if (confirm('Are you sure you want to delete this post?')) {
                                                this.props.deletePost(this.props.data._id);
                                            }
                                        }}
                            />
                        </CardActions>
                    </div>
                </div>
            </HorizontalCard>
        );
    }
    
}

PostView.propTypes = { 
    data: React.PropTypes.object,
    style: React.PropTypes.object,
    partition: React.PropTypes.array,
    orientation: React.PropTypes.string,
    mode: React.PropTypes.string,
    heightFactor: React.PropTypes.number,
    width: React.PropTypes.string,
    handleSetMode: React.PropTypes.function,
};

PostView.defaultProps = { 
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