import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';
import Images from '../../../assets/Images';

  class Cell extends Component {
    constructor(props){
        super(props);

        this.state = {
            count: null,
            flipped: false,
            
            isMine: Math.random() < 0.1,
            ismarked:false

        }
    }

    finish = () => {
        if (this.state.flipped){
         
            return;
        }

        this.setState({
            flipped: true
        })
    }

 
    resetCell = () => {
        this.setState({
            count: null,
            flipped: false,
            isMine: Math.random() < 0.1,
            ismarked:false
        })
    }
    flipCell = (userInitiated) => {
      
        if (this.state.flipped){
            return;
        }

        if (!userInitiated && this.state.isMine){
            return;
        }

        this.setState({
            flipped: true
        }, () => {
            if (this.state.isMine)
            {
                this.props.explode();
            } else 
            {
                this.props.flipState(this.props.x, this.props.y);
            }
        });
    }

    render() {
        if (!this.state.flipped){
            return (
                <TouchableOpacity onPress={() => { this.flipCell(true); }}>
                    <View style={[ styles.cell, { width: this.props.width, height: this.props.height }]}>

                    </View>
                </TouchableOpacity>
            )
        } else {
         
            let content = null;
            if (this.state.isMine){
                debugger;
                content = (
                    <Image source={Images.mine} style={{ width: this.props.width / 2, height: this.props.height / 2}} resizeMode="contain" />
                )
            } else if (this.state.count){
                
                content = (
                    <Text>{this.state.count}</Text>
                )
            }

            return (
                <View style={[ styles.flibbedCell, { width: this.props.width, height: this.props.height }]}>
                    {content}
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    cell: {
        backgroundColor: '#bdbdbd',
        borderWidth: 3,
        borderTopColor: '#ffffff',
        borderLeftColor: '#ffffff',
        borderRightColor: '#7d7d7d',
        borderBottomColor: '#7d7d7d'
    },
    flibbedCell: {
        backgroundColor: '#bdbdbd',
        borderWidth: 1,
        borderColor: '#7d7d7d',
        alignItems: 'center',
        justifyContent: 'center'
    }

})
export default  Cell;
