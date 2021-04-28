import React from 'react';
import { create } from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import MenuItem from '../MenuItem';
import { Button } from '@chakra-ui/button';

test('Render a simple menu item', () => {
  const item = create(
    <BrowserRouter>
      <MenuItem />
    </BrowserRouter>
  );
  const tree = item.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render a menu item with text', () => {
  const item = create(
    <BrowserRouter>
      <MenuItem to="/test">A Menu Item</MenuItem>
    </BrowserRouter>
  );
  const tree = item.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render a menu button', () => {
  const item = create(
    <BrowserRouter>
      <MenuItem to="/button" isLast>
        <Button>A Button</Button>
      </MenuItem>
    </BrowserRouter>
  );
  const tree = item.toJSON();
  expect(tree).toMatchSnapshot();
});
