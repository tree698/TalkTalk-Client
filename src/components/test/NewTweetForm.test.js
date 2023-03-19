import NewTweetForm from '../NewTweetForm';
import renderer from 'react-test-renderer';
import { withApiContext, withRouter } from '../../test/utils';
import { Route } from 'react-router-dom';
import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('NewTweetForm', () => {
  const fakeContext = {
    tweetService: {
      createTweet: jest.fn(),
    },
  };

  it('renders correctly', () => {
    const component = renderer.create(
      withApiContext(
        withRouter(<Route path="/" element={<NewTweetForm />} />, {
          state: { id: 'fakeId' },
        }),
        fakeContext
      )
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('type tweet correctly', async () => {
    render(
      withApiContext(
        withRouter(<Route path="/" element={<NewTweetForm />} />, {
          state: { id: 'fakeId' },
        }),
        fakeContext
      )
    );

    const inputElement = screen.getByRole('textbox');
    userEvent.type(inputElement, 'fakedTweet');

    await waitFor(() => {
      expect(inputElement.value).toBe('fakedTweet');
    });
  });

  it('should call createTweet and setTweet when form is submitted', async () => {
    fakeContext.tweetService.createTweet.mockImplementation(() =>
      Promise.resolve({})
    );
    const { getByTestId } = render(
      withApiContext(
        withRouter(<Route path="/" element={<NewTweetForm />} />, {
          state: { id: 'fakedId' },
        }),
        fakeContext
      )
    );

    const input = getByTestId('input-tweet');
    const submitBtn = getByTestId('submit-tweet');

    await userEvent.type(input, 'hello');
    userEvent.click(submitBtn);

    await waitFor(() => {
      expect(fakeContext.tweetService.createTweet).toHaveBeenCalledTimes(1);
      expect(fakeContext.tweetService.createTweet).toHaveBeenCalledWith(
        'hello',
        'fakedId'
      );
      expect(input).toHaveValue('');
    });
  });
});
