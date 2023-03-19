import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { withApiContext, withRouter } from '../../test/utils';
import Signup from '../Signup';

jest.mock('../../uploader/FileUploadToCloudinary');

describe('Upload', () => {
  const fakeContext = {
    authService: {
      signup: jest.fn(),
    },
  };

  afterEach(() => fakeContext.authService.signup.mockReset());

  it('renders correctly', () => {
    const component = renderer.create(
      withApiContext(
        withRouter(<Route path="/" element={<Signup />} />),
        fakeContext
      )
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('display input value correctly', async () => {
    render(
      withApiContext(
        withRouter(<Route path="/" element={<Signup />} />),
        fakeContext
      )
    );
    const username = screen.getByPlaceholderText('Username (* Required)');

    userEvent.type(username, 'ellie');

    await waitFor(() => {
      expect(username).toHaveValue('ellie');
    });
  });

  it('navigate to login page when clicking login button', async () => {
    render(
      withApiContext(
        withRouter(
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup" element={<p>Login</p>} />
          </>,
          '/signup'
        ),
        fakeContext
      )
    );

    const button = screen.getByTestId('loginBtn');

    userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Login')).toBeInTheDocument();
    });
  });
});
