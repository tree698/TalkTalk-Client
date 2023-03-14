import { Route } from 'react-router-dom';
import { withRouter } from '../../test/utils';
import SelectedDrawing from '../SelectedDrawing';
import renderer from 'react-test-renderer';
import LoggedInUser from '../LoggedInUser';

jest.mock('../LoggedInUser');

describe('SelectedDrawing', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      withRouter(<Route path="/" element={<SelectedDrawing />} />, {
        state: {
          fileName: 'test',
          title: 'test',
          username: 'test',
          brush: 'test',
          description: 'test',
          photo: 'test',
        },
      })
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
