import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';

test('Shows the Header', () => {
  const header = renderer.create(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  const tree = header.toJSON();
  expect(tree).toMatchSnapshot();
});