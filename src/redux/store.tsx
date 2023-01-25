import {configureStore} from '@reduxjs/toolkit';
import modalReducer, {showModal, hideModal} from '../redux/slices/modal';

export const store = configureStore({
  reducer: {modalReducer},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {showModal, hideModal};
