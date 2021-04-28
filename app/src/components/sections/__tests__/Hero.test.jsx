import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Hero from '../Hero';

test('Show the hero component with standard text', () => {
  const hero = renderer.create(
    <BrowserRouter>
      <Hero />
    </BrowserRouter>
  );
  const tree = hero.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Show the hero component with customized text', () => {
  const hero = renderer.create(
    <BrowserRouter>
      <Hero
        title="This is a test title"
        subtitle="In this section I describe my awesome new service."
        image="https://source.unsplash.com/collection/404888/800x600"
        ctaText="Sign up now!"
        ctaLink="/create-account"
        ctaRemark="No commitment expected."
      />
    </BrowserRouter>
  );
  const tree = hero.toJSON();
  expect(tree).toMatchSnapshot();
});