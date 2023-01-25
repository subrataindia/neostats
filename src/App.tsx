import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './navigator/MyStack';
import Modal from './components/Modal';

const App = () => {
  return (
    <NavigationContainer>
      <Modal />
      <MyStack />
    </NavigationContainer>
  );
};

export default App;
