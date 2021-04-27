import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import LandingLayout from '../LandingLayout';

test('Show empty landing layout', () => {
  const layout = renderer.create(
    <BrowserRouter>
      <LandingLayout />
    </BrowserRouter>
  );
  const tree = layout.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Show landing layout with one line content', () => {
  const layout = renderer.create(
    <BrowserRouter>
      <LandingLayout>
        This is a simple text
      </LandingLayout>
    </BrowserRouter>
  );
  const tree = layout.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Show landing layout with complex content', () => {
  const layout = renderer.create(
    <BrowserRouter>
      <LandingLayout>
        <h1>Title</h1>
        <h2>Subtitle</h2>
        <div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque a nobis odio iste animi! Amet dolores quasi doloremque nostrum ratione laboriosam expedita iure corporis culpa, odio ex, deserunt eos dicta.</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati quaerat, autem atque pariatur soluta, omnis iure cum quas maiores in eveniet fugiat error! Recusandae architecto reiciendis qui cum, officia est!
          </p>
        </div>
      </LandingLayout>
    </BrowserRouter>
  );
  const tree = layout.toJSON();
  expect(tree).toMatchSnapshot();
});
