import { withRouter } from '../../test/utils';
import renderer from 'react-test-renderer';
import ActionBtn from '../ActionBtn';
import { Route } from 'react-router-dom';

describe('Action Btn', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      withRouter(<Route path="/" element={<ActionBtn />} />)
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
