import {Dimensions} from 'react-native';

const myConstants = {
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
  titleFontSize: 20,
  loading: 'LOADING',
  idle: 'IDLE',
  fulfilled: 'FULFILLED',
  API_KEY: 'DEMO_KEY',
};

export default myConstants;
