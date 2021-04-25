import renderer from 'react-test-renderer';
import Hero from '../Hero';

test('Show the hero component', () => {
  const hero = renderer.create(<Hero />);
  const tree = hero.toJSON();
  expect(tree).toMatchSnapshot();
});