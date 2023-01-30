import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MyModal from '../src/components/Modal';
import myConstants from '../src/config/constants';

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
