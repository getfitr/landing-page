import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

test('Shows the app', () => {
  const main = renderer.create(<App />);
  const tree = main.toJSON();
  expect(tree).toMatchSnapshot();
});
