import React from 'react';
import SearchIcon from 'material-ui/svg-icons/action/search';
import styles from '../styles';

export default class Heading extends React.Component {
    render() {
        return (
            <div style={Object.assign({}, styles.listHeading, this.props.style)}>
                {this.props.text} {this.props.rightText ? '(' + this.props.rightText + ')': ''}
            </div>
        );
    }
}