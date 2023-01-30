import {View, Text} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {Card} from 'react-native-paper';
import BarChart from '../components/BarChart';

const Report = () => {
  const data = useSelector((state: any) => state.neoFeedReducer.data);
  console.log('Data with in report screen', data);
  if (data) {
    return (
      <>
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
        <BarChart data={data?.data} />
      </>
    );
  } else {
    return <Text>Unable to Show Data! Please Try Later.</Text>;
  }
};

export default Report;
