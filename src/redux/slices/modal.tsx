import {createSlice} from '@reduxjs/toolkit';
import myConstants from '../../config/constants';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    title: '',
    type: '', // Error, Info, Warning
    body: '',
    visible: false,
    closable: true,
  },
  reducers: {
    showModal: (state, action) => {
      if (action.payload) {
        state.type = action.payload.type;
        state.title = action.payload.title;
        state.body = action.payload.body;
        state.visible = true;
        state.closable = action.payload.closable;
      } else {
        state.type = myConstants.loading;
        state.title = 'Loading';
        state.body = 'Pleae Wait...';
        state.visible = true;
        state.closable = false;
      }
    },
    hideModal: state => {
      state.title = '';
      state.body = '';
      state.visible = false;
      state.type = '';
    },
  },
});

export const {showModal, hideModal} = modalSlice.actions;
export default modalSlice.reducer;
