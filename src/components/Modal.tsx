import React from 'react';
import {Modal, View, TouchableOpacity} from 'react-native';
import {Button, Text, Card} from 'react-native-paper';
import myConstants from '../config/constants';
import loadingImg from '../assets/loading.gif';
import successImg from '../assets/success.gif';
import errorImg from '../assets/error.gif';
import warningImg from '../assets/warning.gif';

type MyModalType = {
  visible: boolean;
  type: string;
  title: string;
  body: string;
  closable: boolean;
  hideCallBack: Function;
};

const MyModal = ({
  visible,
  type,
  title,
  body,
  closable,
  hideCallBack,
}: MyModalType) => {
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
          <Card.Cover source={reqImg(type)} style={{margin: 40}} />
          <Card.Content>
            <Text style={{textAlign: 'center'}}>{body}</Text>
          </Card.Content>
          <Card.Actions>
            {closable && (
              <TouchableOpacity
                onPress={() => {
                  hideCallBack();
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
  if (type === myConstants.error) return errorImg;
  if (type === myConstants.warning) return warningImg;
  if (type === myConstants.loading) return loadingImg;
  if (type === myConstants.success) return successImg;
};
