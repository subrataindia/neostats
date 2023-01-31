import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MyBarChart from '../src/components/BarChart';

test('Empty Modal renders correctly', () => {
  const tree = renderer.create(<MyBarChart />).toJSON();
  expect(tree).toMatchSnapshot();
});
