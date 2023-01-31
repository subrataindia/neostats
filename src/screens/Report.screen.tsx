import {ScrollView, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BarChart, CustomCard} from '../components';
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
      <ScrollView style={{padding: 10}}>
        <CustomCard
          title={'Fastest Asteroid'}
          content1={`ID: ${data?.fastest_asteroid?.id}`}
          content2={`Speed: ${Number(data?.fastest_asteroid?.speed).toFixed(
            2,
          )} Km/h`}
        />
        <CustomCard
          title={'Closest Asteroid'}
          content1={`ID: ${data?.closest_asteroid?.id}`}
          content2={`Distance: ${Number(
            data?.closest_asteroid?.distance,
          ).toFixed(3)} Km`}
        />
        <CustomCard
          title={'Average Size of the Asteroids'}
          content1={`Estimated Diameter: ${Number(data?.averageSize).toFixed(
            3,
          )} Km`}
        />
        <BarChart
          data={data?.data}
          width={myConstants.screenWidth - 20}
          height={myConstants.screenHeight}
        />
      </ScrollView>
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
