import renderer from 'react-test-renderer';
import NotFound from '../NotFound';

describe('Not Found', () => {
  it('renders correctly', () => {
    const component = renderer.create(<NotFound />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
