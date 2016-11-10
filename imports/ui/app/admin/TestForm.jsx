import React from 'react';
import {connect} from 'react-redux';
import {printTest} from '../../actions/actions';
import FlatButton from 'material-ui/FlatButton';

class TestForm extends React.Component {
    constructor(props) {
        super(props);
        this.printStateItem = this.printStateItem.bind(this);
        this.printAll = this.printAll.bind(this);
    }
    printStateItem() {
        console.log("PRINT STATE ITEM", this.props.stateData);
    }
    
    printAll() {
        this.printStateItem();
        this.props.onTest();
    }
    
    render() {
        return (
            <FlatButton onClick={this.printAll} label="PRINT TEST" />
        )
    }
}

mapStateToProps = (state) => {
    return {
        item: state.item,
        postForm: state.postForm,
        stateData: state,
        sample: 'SAMPLE DATA',
    }
}

mapDispatchToProps = (dispatch) => {
    return {
        onTest: () => {
            dispatch(printTest('Hello World'));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TestForm);