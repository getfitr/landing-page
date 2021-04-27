import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Landing from '../Landing';

test("Shows the landing page", () => {
  const component = renderer.create(
    <BrowserRouter>
      <Landing />
    </BrowserRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
