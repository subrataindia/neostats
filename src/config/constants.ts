import {Dimensions} from 'react-native';

const myConstants = {
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
  titleFontSize: 20,
  loading: 'LOADING',
  idle: 'IDLE',
  pending: 'PENDING',
  fulfilled: 'FULFILLED',
  rejected: 'REJECTED',
  API_KEY: 'DEMO_KEY',
  error: 'ERROR',
  info: 'INFO',
  warning: 'WARNING',
  success: 'SUCCESS',
  screens: {
    home: 'Home',
    report: 'Report',
  },
};

export default myConstants;
