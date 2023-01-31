import 'react-native';
import React from 'react';
import formatDateYYYYMMDD from './formatDate';

test('Testing formatDate function', () => {
  const dt = formatDateYYYYMMDD(Date.parse('30 Jan 2023 00:12:00 GMT'));
  expect(dt).toBe('2023-01-30');
});
