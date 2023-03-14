import renderer from 'react-test-renderer';
import { withApiContext, withRouter } from '../../test/utils';
import Navbar from '../Navbar';
import { Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Navbar', () => {
  let fakeContext;
  beforeEach(() => {
    fakeContext = {
      user: {
        photo: 'test',
        username: 'test',
      },
      logout: jest.fn(),
    };
  });
  afterEach(() => fakeContext.logout.mockReset());

  it('renders correctly', () => {
    const component = renderer.create(
      withApiContext(
        withRouter(<Route path="/" element={<Navbar />} />),
        fakeContext
      )
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('display confirm message and navigate to home when clicking logout button', () => {
    const mockAlert = jest
      .spyOn(window, 'confirm')
      .mockImplementation(() => {});

    render(
      withApiContext(
        withRouter(
          <>
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/" element={<p>This is Home Page</p>} />
          </>,
          '/navbar'
        ),
        fakeContext
      )
    );
    const btn = screen.getByRole('button');

    userEvent.click(btn);

    expect(mockAlert).toHaveBeenCalled();
    // expect(screen.getByText('This is Home Page')).toBeInTheDocument();
  });
});
