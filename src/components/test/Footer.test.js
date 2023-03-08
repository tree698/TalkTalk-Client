import { Route } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { withRouter } from '../../test/utils';
import Footer from '../Footer';

describe('Not Found', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      withRouter(<Route path="/" element={<Footer />} />)
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
