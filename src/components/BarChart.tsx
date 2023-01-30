import {View, Text} from 'react-native';
import React from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {Card} from 'react-native-paper';

const MyBarChart = ({
  data,
  width,
  height,
}: {
  data: any;
  width: number;
  height: number;
}) => {
  return (
    <>
      {data ? (
        <View style={{flex: 1}}>
          <BarChart
            style={{
              marginVertical: 10,
              borderRadius: 20,
            }}
            data={data}
            width={width}
            height={height / 3}
            yAxisLabel=""
            fromZero
            showBarTops
            showValuesOnTopOfBars
            chartConfig={{
              formatXLabel: label => label.substring(8),

              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {borderRadius: 15},
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
              propsForVerticalLabels: {},
            }}
            verticalLabelRotation={0}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default MyBarChart;
