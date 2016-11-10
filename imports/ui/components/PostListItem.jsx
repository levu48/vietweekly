import React from 'react';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';
import ImageListItem from './ImageListItem.jsx';
import Divider from 'material-ui/Divider';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';
import ActionSearch from 'material-ui/svg-icons/action/search';
import CommunicationComment from 'material-ui/svg-icons/communication/comment';
import ImageRemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ToggleStar from 'material-ui/svg-icons/toggle/star';
import {grey200, grey300, grey500, grey800, red500} from 'material-ui/styles/colors';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import GoogleSearch from './GoogleSearch.jsx';

moment.locale('vi', {
    months : "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
    monthsShort : "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
    weekdays : "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
    weekdaysShort : "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
    weekdaysMin : "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        LTS : "HH:mm:ss",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd D MMMM YYYY LT"
    },
    calendar : {
        sameDay: "[Aujourd'hui à] LT",
        nextDay: '[Demain à] LT',
        nextWeek: 'dddd [à] LT',
        lastDay: '[Hier à] LT',
        lastWeek: 'dddd [dernier à] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : "%s tới",
        past : "%s",
        s : "1 giây",
        m : "1 p",
        mm : "%d p",
        h : "1 h",
        hh : "%d h",
        d : "1 ngày",
        dd : "%d ngày",
        M : "1 t",
        MM : "%d t",
        y : "1 năm",
        yy : "%d năm"
    },
    ordinalParse : /\d{1,2}(er|ème)/,
    ordinal : function (number) {
        return number + (number === 1 ? 'er' : 'ème');
    },
    meridiemParse: /PD|MD/,
    isPM: function (input) {
        return input.charAt(0) === 'M';
    },
    // in case the meridiem units are not separated around 12, then implement
    // this function (look at locale/id.js for an example)
    // meridiemHour : function (hour, meridiem) {
    //     return /* 0-23 hour, given meridiem token and hour 1-12 */
    // },
    meridiem : function (hours, minutes, isLower) {
        return hours < 12 ? 'PD' : 'MD';
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

const styles = {
    info: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 10,
        color: grey500,   
        marginTop: 4,     
    },
    
    icon: {
        width: 12,
        height: 12,
        marginLeft: 20,
        marginRight: 4,
        marginTop: 0,
        marginBottom: 0,
        color: grey500,
    },
    
};

export default class PostListItem extends React.Component {
    constructor(props) {
        super(props);
        this.toggleSearch = this.toggleSearch.bind(this);
        this.state = {
            searchOpen: false,
        }
        this.googleSearchComp = {
            toggleSearch: () => {}
        }
    }
    
    toggleSearch() {
        this.setState({searchOpen: !this.state.searchOpen});
    }
    
    render() {
        let {post, image, item, contentType, ref, handleTouchTapRating, handleSearch} = this.props;
        return (
            <ImageListItem _id={post._id}
                        //ref={(ref) => this.listItems[post._id] = ref}
                        leftAvatar={<img width={100} src={image} />}
                        primaryText={post.title}
                        secondaryText={post.subtitle}
                        secondaryTextLines={2}
                        info={<div>
                                <div style={styles.info}>
                                    <ActionSchedule style={styles.icon} />{moment(item.createdAt).fromNow()}
                                    <CommunicationComment style={styles.icon} hoverColor={red500} />102
                                    <ImageRemoveRedEye style={styles.icon} hoverColor={red500} />{post.views ? post.views : '-'}
                                    <ToggleStar style={styles.icon} hoverColor={red500} onTouchTap={(event) => handleTouchTapRating(event, post)} />{post.rating ? post.rating.toFixed(2) : '-'}
                                    {item.editorial ? <span onClick={() => this.props.setContent(post._id, 'editorial', post)} style={{cursor: 'pointer'}}>
                                            <EditorModeEdit style={styles.icon} hoverColor={red500} />Bình dẫn</span> : null}
                                    {Meteor.user() && Meteor.user().username === 'jsun246' ? <span onClick={() => this.props.editPost(post._id)} style={{cursor: 'pointer'}}>
                                            <EditorModeEdit style={styles.icon} hoverColor={red500} /></span> : null}
                                    {Meteor.user() && Meteor.user().username === 'jsun246' ? <span onClick={() => {
                                                if (confirm(`Are you sure you want to delete the post with the title "${post.title}"?`)) {
                                                    this.props.deletePost(post._id);
                                                }
                                            }} style={{cursor: 'pointer'}}>
                                    <ActionDelete style={styles.icon} hoverColor={red500} /></span> : null}
                                    <ActionSearch style={styles.icon} hoverColor={red500} onTouchTap={this.googleSearchComp.toggleSearch} />
                                </div>
                                <GoogleSearch ref={(ref) => this.googleSearchComp = ref} {...this.props} searchText={post.title}/>
                            </div>
                        }
                        onTouchTap={() => {
                                this.props.setPage('unknown');
                                this.props.setContent(post._id, contentType, post);
                            }}
                        />
        )
    }
    
}