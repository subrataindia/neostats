import {View, Text} from 'react-native';
import React from 'react';
import MyModal from '../components/Modal';
import {useDispatch, useSelector} from 'react-redux';
import {hideModal, RootState} from '../redux/store';

const Modal = () => {
  const visible = useSelector((state: RootState) => state.modalReducer.visible);
  const type = useSelector((state: RootState) => state.modalReducer.type);
  const title = useSelector((state: RootState) => state.modalReducer.title);
  const body = useSelector((state: RootState) => state.modalReducer.body);
  const closable = useSelector(
    (state: RootState) => state.modalReducer.closable,
  );
  const dispatch = useDispatch();

  return (
    <>
      <MyModal
        visible={visible}
        type={type}
        title={title}
        body={body}
        closable={closable}
        hideCallBack={() => dispatch(hideModal())}
      />
    </>
  );
};

export default Modal;
