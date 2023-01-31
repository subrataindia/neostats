import * as React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import App from './src/App';
import {store} from './src/redux/store';
import {Provider as StoreProvider} from 'react-redux';

const Main = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </StoreProvider>
  );
};

export default Main;
