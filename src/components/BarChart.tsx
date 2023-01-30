import {View, Text} from 'react-native';
import React from 'react';

const BarChart = ({data}: {data: any}) => {
  return (
    <>
      {data ? (
        <View>
          <Text>BarChart</Text>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default BarChart;
