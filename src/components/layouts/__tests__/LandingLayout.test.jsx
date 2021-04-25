import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import LandingLayout from '../LandingLayout';

test('Show Landing Layout (with header, children, and footer)', () => {
  const layout = renderer.create(
    <BrowserRouter>
      <LandingLayout>
        <div>Hello World!</div>
      </LandingLayout>
    </BrowserRouter>
  );
  const tree = layout.toJSON();
  expect(tree).toMatchSnapshot();
});