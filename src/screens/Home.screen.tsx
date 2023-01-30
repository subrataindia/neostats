import React, {useState} from 'react';
import {SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import formatDateYYYYMMDD from '../helpers/formatDate';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {fetchData, showModal} from '../redux/store';
import myConstants from '../config/constants';

const Home = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [fromDatePickerStatus, setFromDatePickerStatus] = useState(false);
  const [toDatePickerStatus, setToDatePickerStatus] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const btnPressed = () => {
    fromDate.setHours(0, 0, 0, 0);
    toDate.setHours(0, 0, 0, 0);
    console.log('Pressed', toDate, fromDate, toDate - fromDate);
    if (toDate - fromDate >= 0) {
      dispatch(
        fetchData({
          FROM_DATE: formatDateYYYYMMDD(fromDate),
          TO_DATE: formatDateYYYYMMDD(toDate),
        }),
      );
      navigation.navigate('Report' as never);
    } else {
      dispatch(
        showModal({
          title: 'From Date Error!',
          type: myConstants.warning,
          body: 'To date should be larger then or equal to from date.',
          closable: true,
        }),
      );
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <Card mode="outlined">
        <Card.Title
          title="Asteroid Neo App"
          titleStyle={{fontSize: 20, textAlign: 'center'}}
        />
        <Card.Cover
          source={{
            uri: 'https://cdn.pixabay.com/photo/2011/12/14/12/23/solar-system-11111_960_720.jpg',
          }}
          style={{borderRadius: 0}}
        />
        <Card.Content style={{marginTop: 10}}>
          <TouchableOpacity
            onPress={() => {
              console.log('Pressed!');
              setFromDatePickerStatus(true);
            }}
            style={{...style.dateInput}}>
            <Text>From: {fromDate.toDateString()}</Text>
            <Ionicons
              style={{marginLeft: 20}}
              name="calendar-sharp"
              size={22}
            />
          </TouchableOpacity>
          <DatePicker
            modal
            open={fromDatePickerStatus}
            date={fromDate}
            mode="date"
            onConfirm={(date: any) => {
              setFromDatePickerStatus(false);
              setFromDate(date);
            }}
            onCancel={() => {
              setFromDatePickerStatus(false);
            }}
          />
          <TouchableOpacity
            onPress={() => setToDatePickerStatus(true)}
            style={{
              ...style.dateInput,
              marginVertical: 20,
            }}>
            <Text>To: {toDate.toDateString()}</Text>
            <Ionicons
              style={{marginLeft: 20}}
              name="calendar-sharp"
              size={22}
            />
          </TouchableOpacity>

          <DatePicker
            modal
            open={toDatePickerStatus}
            date={toDate}
            mode="date"
            onConfirm={date => {
              setToDatePickerStatus(false);
              setToDate(date);
            }}
            onCancel={() => {
              setToDatePickerStatus(false);
            }}
          />
        </Card.Content>
        <Card.Actions>
          <TouchableOpacity onPress={btnPressed}>
            <Button mode="outlined">Submit</Button>
          </TouchableOpacity>
        </Card.Actions>
      </Card>
    </SafeAreaView>
  );
};

export default Home;

const style = StyleSheet.create({
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: 'rgba(20,20,20,0.3)',
  },
});
