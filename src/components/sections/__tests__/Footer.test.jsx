import renderer from 'react-test-renderer';
import Footer from '../Footer';

test('Shows the Footer', () => {
  const footer = renderer.create(<Footer />);
  const tree = footer.toJSON();
  expect(tree).toMatchSnapshot();
});