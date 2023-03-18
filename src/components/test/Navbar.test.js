import renderer from 'react-test-renderer';
import { withApiContext, withRouter } from '../../test/utils';
import Navbar from '../Navbar';
import { Route } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Navbar', () => {
  let fakeContext;
  beforeEach(() => {
    fakeContext = {
      user: {
        photo: 'test',
        username: 'test',
      },
      logOut: jest.fn(),
    };
  });
  afterEach(() => fakeContext.logOut.mockReset());

  it('renders correctly', () => {
    const component = renderer.create(
      withApiContext(
        withRouter(<Route path="/" element={<Navbar />} />),
        fakeContext
      )
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('navigate to home when clicking logout button', async () => {
    jest.spyOn(window, 'confirm').mockImplementation(() => true);

    fakeContext.logOut.mockImplementation(async () => {});

    render(
      withApiContext(
        withRouter(
          <>
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/" element={<p>{'Navigated Page!'}</p>} />
          </>,
          '/navbar'
        ),
        fakeContext
      )
    );
    const btn = screen.getByRole('button');

    userEvent.click(btn);

    await waitFor(() => {
      expect(screen.getByText('Navigated Page!')).toBeInTheDocument();
    });
  });
});
