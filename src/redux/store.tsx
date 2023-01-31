import {configureStore} from '@reduxjs/toolkit';
import modalReducer, {showModal, hideModal} from '../redux/slices/modal';
import neoFeedReducer, {fetchData, resetData} from './slices/NeoFeed';

export const store = configureStore({
  reducer: {modalReducer, neoFeedReducer},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {showModal, hideModal, fetchData, resetData};
