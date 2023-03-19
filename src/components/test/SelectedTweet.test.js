import { Route } from 'react-router-dom';
import { withApiContext, withRouter } from '../../test/utils';
import SelectedTweet from '../SelectedTweet';
import renderer from 'react-test-renderer';
import { fakeTweets as tweets } from '../../test/tweetsData';
import { render, waitFor } from '@testing-library/react';

jest.mock('../UsersInConversation');
jest.mock('../NewTweetForm');
jest.mock('../TweetCard');

describe('SelectedTweet', () => {
  const fakeContext = {
    user: 'fakeUser',
    tweetService: {
      getTweets: jest.fn(),
      onSync: jest.fn(),
      deleteTweet: jest.fn(),
    },
  };

  it('renders correctly', async () => {
    fakeContext.tweetService.getTweets.mockResolvedValue(tweets);

    const component = renderer.create(
      withApiContext(
        withRouter(<Route path="/" element={<SelectedTweet />} />, {
          state: { id: 'fakeId' },
        }),
        fakeContext
      )
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders with tweets', async () => {
    fakeContext.tweetService.onSync.mockReturnValue(jest.fn());
    fakeContext.tweetService.getTweets.mockImplementation(() =>
      Promise.resolve(tweets)
    );

    render(
      withApiContext(
        withRouter(<Route path="/" element={<SelectedTweet />} />, {
          state: { id: 'fakeId' },
        }),
        fakeContext
      )
    );

    await waitFor(() => {
      expect(fakeContext.tweetService.onSync).toHaveBeenCalled();
      expect(fakeContext.tweetService.getTweets).toHaveBeenCalled();
    });
  });
});
