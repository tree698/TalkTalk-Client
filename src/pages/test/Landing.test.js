import renderer from 'react-test-renderer';
import Landing from '../Landing';

jest.mock('../../components/Heading');
jest.mock('../../components/Footer');

describe('Home', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Landing />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
