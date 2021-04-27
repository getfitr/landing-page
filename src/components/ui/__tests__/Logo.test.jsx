import React from 'react';
import renderer from 'react-test-renderer';
import Logo from '../Logo';

test('Displays the Logo', () => {
  const logo = renderer.create(<Logo />)
  const tree = logo.toJSON()
  expect(tree).toMatchSnapshot();
});