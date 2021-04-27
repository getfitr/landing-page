import React from 'react';
import renderer from 'react-test-renderer';
import { CloseIcon, MenuIcon } from '../Icons';

test('Display close icon', () => {
  const logo = renderer.create(<CloseIcon />)
  const tree = logo.toJSON()
  expect(tree).toMatchSnapshot();
});

test('Display menu icon', () => {
  const logo = renderer.create(<MenuIcon />)
  const tree = logo.toJSON()
  expect(tree).toMatchSnapshot();
});
