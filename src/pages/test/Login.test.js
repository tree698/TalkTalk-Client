import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { withApiContext, withRouter } from '../../test/utils';
import Login from '../Login';

describe('Upload', () => {
  const fakeContext = {
    logIn: jest.fn(),
  };

  afterEach(() => fakeContext.logIn.mockReset());

  it('renders correctly', () => {
    const component = renderer.create(
      withApiContext(
        withRouter(<Route path="/" element={<Login />} />),
        fakeContext
      )
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('display input value correctly', async () => {
    render(
      withApiContext(
        withRouter(<Route path="/" element={<Login />} />),
        fakeContext
      )
    );
    const username = screen.getByRole('textbox', { name: /username/i });

    userEvent.type(username, 'ellie');

    await waitFor(() => {
      expect(username).toHaveValue('ellie');
    });
  });

  it('navigate to signup page when clicking the signup button', async () => {
    render(
      withApiContext(
        withRouter(
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<p>Sign</p>} />
          </>,
          '/login'
        ),
        fakeContext
      )
    );

    const button = screen.getByTestId('signupBtn');
    userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Sign')).toBeInTheDocument();
    });
  });

  it('Successfully login', async () => {
    fakeContext.logIn.mockImplementation((username, password) => {
      return 'Successfully login';
    });

    render(
      withApiContext(
        withRouter(<Route path="/" element={<Login />} />),
        fakeContext
      )
    );

    const form = screen.getByTestId('loginBtn');
    userEvent.click(form);

    await waitFor(() => {
      expect(fakeContext.logIn).toBeCalled();
    });
  });
});
