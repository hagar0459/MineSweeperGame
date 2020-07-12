import { Dimensions } from 'react-native';

export default Constants = {
    MAX_WIDTH: Dimensions.get('screen').width,
    MAX_HEIGHT: Dimensions.get('screen').height,
    BOARD_SMALL_SIZE: 8,
    BOARD_MED_SIZE: 12,
    BOARD_LARGE_SIZE: 15,
    CELL_SIZE: 25,
    BOARD_SMALL_MINES: .1,
    BOARD_MED_MINES: .2,
    BOARD_LARGE_MINES: .3,
    BOARD_SMALL_TIME:60,
    BOARD_MED_TIME:120,
    BOARD_LARGE_TIME: 180,


}
