import React from 'react';
import styles from '../styles';


const GroupStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '600px',
    border: '1px',
};


export default class PostGroup extends React.Component {
    getPartition(index) {
        if (!this.props.partition || this.props.partition.length < index) {
            return 1;
        }
        return this.props.partition[index];
    }
    
    calcWidth(index) {
        const WIDTH_SIZE = 600;
        if (!this.props.partition) {
            return WIDTH_SIZE;
        }
        let sum = this.props.partition.reduce((a, b) => { return a + b;}, 0);
        return Math.floor(this.getPartition(index) * WIDTH_SIZE / sum);
    }
    
    render() {
        const {orientation, partition, children} = this.props;
        const style = Object.assign({}, GroupStyle, {
            flexDirection: (orientation === 'horizontal' ? 'row' : 'column'),
        });
        
        if (orientation === 'horizontal') {
            let newChildren = React.Children.map(children, (child, index) => {
                if ((index === 0 && children.length === 1) || children.length === undefined) {
                    return React.cloneElement(child, {style: {flex: this.getPartition(index), marginLeft: 0, marginRight: 0, width: this.calcWidth(index)}});
                    
                } else if (index === 0) {
                    return React.cloneElement(child, {style: {flex: this.getPartition(index), marginLeft: 0, marginRight: 5, width: this.calcWidth(index)}});
                    
                } else if (index === children.length -1) {
                    return React.cloneElement(child, {style: {flex: this.getPartition(index), marginLeft: 5, marginRight: 0, width: this.calcWidth(index)}});
                    
                } else {
                    return React.cloneElement(child, {style: {flex: this.getPartition(index), marginLeft: 5, marginRight: 5, width: this.calcWidth(index)}});
                }
            });
            
            return (
                <div {...this.props} style={style} >
                    {newChildren}
                </div>
            );
        }
        
        return (
            <div {...this.props} style={style}>
                {children}
            </div>
        );
    }
}