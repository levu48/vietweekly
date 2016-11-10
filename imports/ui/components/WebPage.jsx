import React from 'react';
import {connect} from 'react-redux';
import styles from '../styles';

export default class WebPage extends React.Component {
    render() {
        return (
            <div style={{ margin: 0, padding: 0,
                        overFlowY: 'hidden', overFlowX: 'hidden',
                        border: '1 solid red', height: 'calc(100% - 4px)', }} >
                <iframe id="web" type="text/html" width={'100%'} height={'100%'}
                        src={this.props.url} style={{ overFlowX: 'hidden'}}
                        frameBorder="0" allowFullScreen></iframe>
            </div>
        );
    }
}

