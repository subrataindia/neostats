import {View, ScrollView, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Card} from 'react-native-paper';
import BarChart from '../components/BarChart';
import myConstants from '../config/constants';
import {resetData, RootState} from '../redux/store';
import handleModal from '../helpers/handleModal';
import {useNavigation} from '@react-navigation/native';

const Report = () => {
  const data = useSelector((state: RootState) => state.neoFeedReducer.data);
  const status = useSelector((state: RootState) => state.neoFeedReducer.status);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(resetData());
  }, []);

  useEffect(() => {
    handleModal(status, dispatch);
    if (status === myConstants.rejected) {
      navigation.goBack();
    }
  }, [status]);

  if (data) {
    return (
      <View style={{padding: 10}}>
        <Card mode="outlined">
          <Card.Title title={'Fastest Asteroid'} />
          <Card.Content>
            <Text>ID: {data?.fastest_asteroid?.id}</Text>
            <Text>
              Speed: {Number(data?.fastest_asteroid?.speed).toFixed(2)} Km/h
            </Text>
          </Card.Content>
        </Card>
        <Card mode="outlined">
          <Card.Title title={'Closest Asteroid'} />
          <Card.Content>
            <Text>ID: {data?.closest_asteroid?.id}</Text>
            <Text>
              Distance: {Number(data?.closest_asteroid?.distance).toFixed(3)} Km
            </Text>
          </Card.Content>
        </Card>
        <Card mode="outlined">
          <Card.Title title={'Average Size of the Asteroids'} />
          <Card.Content>
            <Text>
              Estimated Diameter: {Number(data?.averageSize).toFixed(3)} Km
            </Text>
          </Card.Content>
        </Card>
        <BarChart
          data={data?.data}
          width={myConstants.screenWidth - 20}
          height={myConstants.screenHeight}
        />
      </View>
    );
  } else {
    return (
      <Text style={{textAlign: 'center', marginTop: 20}}>
        Unable to Show Data! Please Try Later.
      </Text>
    );
  }
};

export default Report;
