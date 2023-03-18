import renderer from 'react-test-renderer';
import Talk from '../Talk';

jest.mock('../../components/Navbar');
jest.mock('../../components/SelectedDrawing');
jest.mock('../../components/SelectedTweet');
jest.mock('../../components/Footer');

describe('Home', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Talk />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
