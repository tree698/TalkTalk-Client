import { Route } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { withRouter } from '../../test/utils';
import NotFound from '../NotFound';

describe('Not Found', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      withRouter(<Route path="/" element={<NotFound />} />)
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
