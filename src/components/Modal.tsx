import React from 'react';
import {Modal, View, Text, Image, Dimensions} from 'react-native';
import myConstants from '../config/constants';
import loadingImg from '../assets/loading.gif';

const MyModal = () => {
  return (
    <Modal animationType="slide" visible={false}>
      <Image source={loadingImg} style={{width: myConstants.screenWidth}} />
    </Modal>
  );
};

export default MyModal;
