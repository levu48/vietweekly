import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import {CardExpandable} from 'material-ui//Card';
import {Card} from 'material-ui/Card';

class HorizontalCard extends Card {    
    constructor(props) {
        super(props);
        this.state = {
            expanded: null,
        };
    }

  componentWillMount() {
    this.setState({
      expanded: this.props.expanded === null ? this.props.initiallyExpanded === true : this.props.expanded,
    });
  }

  componentWillReceiveProps(nextProps) {
    // update the state when the component is controlled.
    if (nextProps.expanded !== null)
      this.setState({expanded: nextProps.expanded});
  }

  handleExpanding(event) {
    event.preventDefault();
    const newExpandedState = !this.state.expanded;
    // no automatic state update when the component is controlled
    if (this.props.expanded === null) {
      this.setState({expanded: newExpandedState});
    }
    if (this.props.onExpandChange) {
      this.props.onExpandChange(newExpandedState);
    }
  };

  render() {
    const {
      style,
      containerStyle,
      children,
      expandable, // eslint-disable-line no-unused-vars
      expanded: expandedProp, // eslint-disable-line no-unused-vars
      initiallyExpanded, // eslint-disable-line no-unused-vars
      onExpandChange, // eslint-disable-line no-unused-vars
      ...other,
    } = this.props;

    let lastElement;
    const expanded = this.state.expanded;
    const newChildren = React.Children.map(children, (currentChild) => {
      let doClone = false;
      let newChild = undefined;
      const newProps = {};
      let element = currentChild;
      if (!currentChild || !currentChild.props) {
        return null;
      }
      if (expanded === false && currentChild.props.expandable === true)
        return;
      if (currentChild.props.actAsExpander === true) {
        doClone = true;
        newProps.onTouchTap = this.handleExpanding;
        newProps.style = Object.assign({cursor: 'pointer'}, currentChild.props.style);
      }
      if (currentChild.props.showExpandableButton === true) {
        doClone = true;
        newChild = <CardExpandable expanded={expanded} onExpanding={this.handleExpanding} />;
      }
      if (doClone) {
        element = React.cloneElement(currentChild, newProps, currentChild.props.children, newChild);
      }
      return element;
    }, this);

    // If the last element is text or a title we should add
    // 8px padding to the bottom of the card
    const addBottomPadding = (lastElement && (lastElement.type.muiName === 'CardText' ||
      lastElement.type.muiName === 'CardTitle'));

    const mergedStyles = Object.assign({
      zIndex: 1,
    }, style);
    const containerMergedStyles = Object.assign({
      paddingBottom: addBottomPadding ? 8 : 0,
    }, containerStyle);

    
    return (
      <Paper {...other} style={mergedStyles}>
        <div style={containerMergedStyles}>
          {newChildren}
        </div>
      </Paper>
    );
  }
}

HorizontalCard.propTypes = {
    children: PropTypes.node,
    containerStyle: PropTypes.object,
    expandable: PropTypes.bool,
    expanded: PropTypes.bool,
    initiallyExpanded: PropTypes.bool,
    onExpandChange: PropTypes.func,
    showExpandableButton: PropTypes.bool,
    style: PropTypes.object,
};
    
    
HorizontalCard.defaultProps = {
    expandable: false,
    expanded: null,
    initiallyExpanded: false,
};
export default HorizontalCard;