import { Route } from 'react-router-dom';
import { withApiContext, withQuery, withRouter } from '../../test/utils';
import UsersInConversation from '../UsersInConversation';
import { render, screen, waitFor } from '@testing-library/react';
import { fakeUsersData } from '../../test/usersData';
import userEvent from '@testing-library/user-event';
import { removeDuplicatedUser } from '../UsersInConversation';

describe('UserInConversation', () => {
  const fakeContext = {
    tweetService: {
      getTweets: jest.fn(),
    },
  };

  afterEach(() => fakeContext.tweetService.getTweets.mockReset());

  it('renders with data', async () => {
    const mockOnClick = jest.fn();
    fakeContext.tweetService.getTweets.mockImplementation(() => {
      const result = removeDuplicatedUser(fakeUsersData);
      return result;
    });
    const { asFragment } = render(
      withQuery(
        withApiContext(
          withRouter(
            <Route
              path="/"
              element={<UsersInConversation onAvatarClick={mockOnClick} />}
            />,
            {
              state: {
                id: 'fakeId',
              },
            }
          ),
          fakeContext
        )
      )
    );

    await waitFor(() => screen.queryByRole('button'));

    // userEvent.click(button);

    expect(asFragment()).toMatchSnapshot();
    // await waitFor(() => expect(mockOnClick).toHaveBeenCalledTimes(1));
    // await waitFor(() => expect(button).toBeInTheDocument());
  });
});
