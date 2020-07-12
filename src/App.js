import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Alert,
    Image,
    Button
    , Text,
} from 'react-native';
import Constants from './Constants';
import Cell from './common/components/Cell';
import CounterDown from './common/components/CounterDown'
import * as Animatable from 'react-native-animatable';

Animatable.initializeRegistryWithDefinitions({
    customSlideUp: {
        from: { translateY: Constants.MAX_HEIGHT },
        to: { translateY: Constants.MAX_HEIGHT / 2 - 300 },
        easing: 'ease-out',
    },
    customScaleUpDown:
    {
        from: { scaleX: 1.4, scaleY: 1.4 },
        to: { scaleX: 1, scaleY: 1 },
        easing: 'ease-out',
    },

});
export default class App extends Component {
    constructor(props) {
        super(props);


        this.state = {
            level: 1,
            smile: null,
            dialogVisibility: false,
            message:'',
            running:true,
            time:Constants.BOARD_LARGE_TIME ,

        }
        this.boardWidth = Constants.CELL_SIZE * Constants.BOARD_LARGE_SIZE;
        this.grid = Array.apply(null, Array(Constants.BOARD_LARGE_SIZE)).map((el, indx) => {
            return Array.apply(null, Array(Constants.BOARD_LARGE_SIZE)).map((el, indx) => {
                return null;
            });
        });
    }
    handleViewRef = ref => this.view = ref;

    animatee = () => {
        this.view.animate('customSlideUp', 1000).then(() => {
            this.view.animate('customScaleUpDown', 500).then(() => {
            });
        });
    };






    onExplode = () => {
   
        this.setState({ dialogVisibility: true,message:'You Lose',smile:false,time:Constants.BOARD_LARGE_TIME,running:false,
    })
        this.animatee();

        for (let i = 0; i < Constants.BOARD_LARGE_SIZE; i++) {
            for (let j = 0; j < Constants.BOARD_LARGE_SIZE; j++) {

                this.grid[i][j].finish();
            }
        }
    }


    isSuccess= () =>
    {  let flipeedcells=0;
        
        for (let i = 0; i < Constants.BOARD_LARGE_SIZE; i++) {
        for (let j = 0; j < Constants.BOARD_LARGE_SIZE; j++) {
            debugger;
if(this.grid[i][j].state.flipped=== true)
{
    flipeedcells++
}
           
        }
    }
    if(flipeedcells === 10)
alert('success');
    }

    showCount = (x, y) => {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if ((i != 0 || j != 0) && x + i >= 0 && x + i <= Constants.BOARD_LARGE_SIZE - 1 && y + j >= 0 && y + j <= Constants.BOARD_LARGE_SIZE - 1) {
                    this.grid[x + i][y + j].flipCell(false);


                }
            }
        }

    }

    onFlipping = (x, y) => {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (x + i >= 0 && x + i <= Constants.BOARD_LARGE_SIZE - 1 && y + j >= 0 && y + j <= Constants.BOARD_LARGE_SIZE - 1) {
                    if (this.grid[x + i][y + j].state.isMine) {
                        count++;
                    }
                }
            }
        }

        if (count > 0) {
            this.grid[x][y].setState({
                count: count
            })
                        // this.setState({smile:true});

        } else {

            this.showCount(x, y);

        }
       this. isSuccess();
    }

    renderBoard = () => {
        return Array.apply(null, Array(Constants.BOARD_LARGE_SIZE)).map((el, rowIndx) => {
            let cellList = Array.apply(null, Array(Constants.BOARD_LARGE_SIZE)).map((el, colIndx) => {
                return <Cell
                    flipState={this.onFlipping}
                    explode={this.onExplode}
                    key={colIndx}
                    width={Constants.CELL_SIZE}
                    height={Constants.CELL_SIZE}
                    x={colIndx}
                    y={rowIndx}
                    ref={(ref) => { this.grid[colIndx][rowIndx] = ref }}
                />
            });

            return (
                <View key={rowIndx} style={{ width: this.boardWidth, height: Constants.CELL_SIZE, flexDirection: 'row' }}>
                    {cellList}
                </View>
            )
        });


    }

    resetGame = () => {
        this.setState({   level: 1,
            smile: null,
            dialogVisibility: false,
            running:true,
            time:Constants.BOARD_LARGE_TIME ,

            message:'',});
        for (let i = 0; i < Constants.BOARD_LARGE_SIZE; i++) {
            for (let j = 0; j < Constants.BOARD_LARGE_SIZE; j++) {
                this.grid[i][j].resetCell();
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={{
                    width: this.boardWidth, flexDirection: 'row', justifyContent: 'space-between',
                    backgroundColor: '#bdbdbd',
                    borderWidth: 3,
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderTopColor: 'white',
                    borderLeftColor: 'white',
                    borderRightColor: '#7d7d7d',
                    borderBottomColor: '#7d7d7d'
                }}>

                    <Text style={{
                        fontSize: 19, fontWeight: '400', color: 'white',
                        padding: 10,
                    }}>Level : {this.state.level}</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        {this.state.smile === true &&
                            <Image style={styles.facestyle} source={Images.smile} />
                        }
                        {this.state.smile === false &&
                            <Image source={Images.sad} style={styles.facestyle} />
                        }
                        {this.state.smile === null &&
                            <Image source={Images.face} style={styles.facestyle} />
                        }
                       
                       <Button title=" Start Play" onPress={this.resetGame} />

                    </View>

                    <View>
                        <View style={{ marginRight: 10, marginLeft: 10 }}>
                            <CounterDown until={this.state.time}
                                size={30}
                                style={{ backgroundColor: 'black', height: 50, marginRight: 10, marginLeft: 10 }}
                                running={this.state.running}
                                onFinish={() => {
                                    this.setState({
                                        dialogVisibility:true,   
                                        message:'You Lose',smile:false,
                                        time:Constants.BOARD_LARGE_TIME ,
                                        running:false,
                                    })
                                }}

                            ></CounterDown>
                        </View>
                    </View>
                </View>
                <View style={{ width: this.boardWidth, height: this.boardWidth, backgroundColor: '#888888', flexDirection: 'column', }}>
                    {this.renderBoard()}
                </View>

                <Animatable.View ref={this.handleViewRef} style={{ position: 'absolute', bottom: Constants.MAX_HEIGHT / 2 - 75, width: '80%' }} >
                    {this.state.dialogVisibility === true &&
                        <View style={{ height: 150, backgroundColor: 'white', width: '100%', borderRadius: 10, borderWidth: 0,justifyContent:'center',alignItems:'center', borderBottomColor: 'grey', flexDirection: 'column' }} >
                            <Text style={{fontSize:18, margin: 20, justifyContent: 'center', alignItems: 'center' }}>{this.state.message}</Text>
                            <Button title="Retry" onPress={this.resetGame} />
                        </View>
                    }


                </Animatable.View>

            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    facestyle:
    {
        width: 40, height: 40
    }, animatedBox:
    {
        width: 180,
        height: 180,
        backgroundColor: '#FF6F00'
    },
});
