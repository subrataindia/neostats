import React from 'react';
import {Modal, View, Image, Dimensions, TouchableOpacity} from 'react-native';
import {Button, Text, Card} from 'react-native-paper';
import myConstants from '../config/constants';
import loadingImg from '../assets/loading.gif';
import successImg from '../assets/success.gif';
import errorImg from '../assets/error.gif';
import warningImg from '../assets/warning.gif';
import {hideModal, RootState} from '../redux/store';
import {useSelector, useDispatch} from 'react-redux';

const MyModal = () => {
  const visible = useSelector((state: RootState) => state.modalReducer.visible);
  const type = useSelector((state: RootState) => state.modalReducer.type);
  const title = useSelector((state: RootState) => state.modalReducer.title);
  const body = useSelector((state: RootState) => state.modalReducer.body);
  const dispatch = useDispatch();

  const closable = useSelector(
    (state: RootState) => state.modalReducer.closable,
  );

  return (
    <Modal animationType="slide" visible={visible}>
      <View
        style={{
          flex: 1,
          padding: 10,
          justifyContent: 'center',
        }}>
        <Card mode="outlined">
          <Card.Title
            title={title}
            titleStyle={{
              fontSize: myConstants.titleFontSize,
              textAlign: 'center',
            }}
          />
          <Card.Cover source={reqImg(type)} />
          <Card.Content>
            <Text style={{textAlign: 'center'}}>{body}</Text>
          </Card.Content>
          <Card.Actions>
            {closable && (
              <TouchableOpacity
                onPress={() => {
                  dispatch(hideModal());
                }}>
                <Button mode="outlined">Close</Button>
              </TouchableOpacity>
            )}
          </Card.Actions>
        </Card>
      </View>
    </Modal>
  );
};

export default MyModal;

const reqImg = (type: string) => {
  console.log('type:', type);
  if (type === myConstants.error) return errorImg;
  if (type === myConstants.warning) return warningImg;
  if (type === myConstants.loading) return loadingImg;
  if (type === myConstants.success) return successImg;
};
