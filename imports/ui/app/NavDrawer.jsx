import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import Divider from 'material-ui/Divider';
import styles from '../styles';
import {white} from 'material-ui/styles/colors';
import {connect} from 'react-redux';
import {setCategory, setNavDrawer} from '../actions/actions';
import {List, ListItem, MakeSelectable} from 'material-ui/List';

const SelectableList = MakeSelectable(List);

class NavDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeList = this.handleChangeList.bind(this);
    }
    
    handleChangeList(event, value) {
        this.props.setCategory(value);
        this.props.toggleNavDrawer();
    }
    
    render() {
        const {docked} = this.props;

        return (
            <Drawer {...this.props} open={this.props.open}
                    docked={docked}
                    onRequestChange={this.props.toggleNavDrawer}
                    width={256}
                    >
                <div onTouchTap={this.props.toggleNavDrawer} style={styles.navDrawerLogo} >
                    <ClearIcon style={{top: 0, marginLeft: '15px', marginRight: '15px'}} color={white} />
                    <img height='40px' src='/images/site/logo.png' style={{marginTop: '5px'}} />
                </div>
                <SelectableList onChange={this.handleChangeList}>
                    <ListItem value='news' primaryText="Tin tức"
                        primaryTogglesNestedList={true} initiallyOpen={true}
                        onTouchTap={() => alert("CLICKED NEWS")}
                        nestedItems={[
                            <ListItem primaryText="Chọn lọc" value='selected' />,
                            <ListItem primaryText="Việt Nam" value='vietnam'   />,
                            <ListItem primaryText="Hoa Kỳ" value="america" />,
                            <ListItem primaryText="Thế giới" value="world" />,
                            <ListItem primaryText="Hải ngoại" value="overseas" />,
                            <ListItem primaryText="Bầu cử Mỹ" value="usElection" />,
                            <ListItem primaryText="Biển Đông" value="eastSea" />,
                            <ListItem primaryText="Tổng hợp" value='news' />,
                        ]}
                    />
                    <ListItem primaryText="Bình luận" value='opinion' />
                    <ListItem primaryText="Việt Nam Ký sự" value='vietnamJournal' />
                    <ListItem primaryText="Video" value='video' />
                    <Divider />
                    <ListItem value='english' primaryText="English News"
                        primaryTogglesNestedList={true} initiallyOpen={false}
                        onTouchTap={() => alert("CLICKED ENGLISH NEWS")}
                        nestedItems={[
                            <ListItem primaryText="Selected" value='englishSelected' />,
                            <ListItem primaryText="World" value='englishWorld' />,
                            <ListItem primaryText="United States" value='englishUs'   />,
                            <ListItem primaryText="Vietnam" value="englishVietnam" />,
                            <ListItem primaryText="East Sea" value='englishEastSea' />,
                            <ListItem primaryText="General" value='english' />,
                        ]}
                    />
                    
                </SelectableList>
            </Drawer>            
        );
    };

}

mapStateToProps = (state) => {
    return {
        open: state.displayNavDrawer
    }
}

function toggleNavDrawer() {
    return (dispatch, getState) => {
        if (getState().displayNavDrawer) {
            dispatch(setNavDrawer(false));
        } else {
            dispatch(setNavDrawer(true));
        }
    }
}

mapDispatchToProps = (dispatch) => {
    return {
        setCategory: (cat) => dispatch(setCategory(cat)),
        toggleNavDrawer: () => dispatch(toggleNavDrawer())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavDrawer);