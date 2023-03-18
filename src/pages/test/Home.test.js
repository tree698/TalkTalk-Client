import renderer from 'react-test-renderer';
import Home from '../Home';

jest.mock('../../components/Navbar');
jest.mock('../../components/ActionBtn');
jest.mock('../../components/Footer');

describe('Home', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Home />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
