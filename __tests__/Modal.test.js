import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MyModal from '../src/components/Modal';

test('Empty Modal renders correctly', () => {
  const tree = renderer
    .create(
      <MyModal
        visible={false}
        type={''}
        title={''}
        body={''}
        closable={false}
        hideCallBack={() => {}}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
