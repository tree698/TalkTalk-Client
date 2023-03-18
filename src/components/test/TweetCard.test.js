import TweetCard from '../TweetCard';
import renderer from 'react-test-renderer';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('TweetCard', () => {
  let fakeTweet;
  beforeEach(() => {
    fakeTweet = {
      id: 'test',
      text: 'test',
      createdAt: new Date(),
      username: 'test',
      photo: 'test',
    };
  });

  it('renders with owner correctly', () => {
    const component = renderer.create(
      <TweetCard owner="fakeOwner" tweet={fakeTweet} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders without owner correctly', () => {
    const component = renderer.create(<TweetCard tweet={fakeTweet} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('send click event when clicking avatar', async () => {
    const mockOnClick = jest.fn();
    render(
      <TweetCard
        owner="fakeOwner"
        tweet={fakeTweet}
        onAvatarClick={mockOnClick}
      />
    );

    const button = screen.getByTestId('avatar');
    userEvent.click(button);
    await waitFor(() => {
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  it('send click event when clicking delete', async () => {
    const mockOnClick = jest.fn();
    render(
      <TweetCard owner="fakeOwner" tweet={fakeTweet} onDelete={mockOnClick} />
    );

    const button = screen.getByTestId('delete');
    userEvent.click(button);
    await waitFor(() => {
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
