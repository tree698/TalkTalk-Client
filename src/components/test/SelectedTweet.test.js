import { Route } from 'react-router-dom';
import { withApiContext, withRouter } from '../../test/utils';
import SelectedTweet from '../SelectedTweet';
import renderer from 'react-test-renderer';
import UsersInConversation from '../UsersInConversation';
import NewTweetForm from '../NewTweetForm';
import { fakeTweets as tweets } from '../../test/tweetsData';

jest.mock('../UsersInConversation');
jest.mock('../NewTweetForm');
jest.mock('../TweetCard');

describe('SelectedTweet', () => {
  afterEach(() => {
    UsersInConversation.mockReset();
    NewTweetForm.mockReset();
  });

  it('renders with tweets', async () => {
    const fakeContext = {
      user: 'fakeUser',
      tweetService: {
        getTweets: jest.fn(),
        onSync: jest.fn(),
        deleteTweet: jest.fn(),
      },
    };

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
});
