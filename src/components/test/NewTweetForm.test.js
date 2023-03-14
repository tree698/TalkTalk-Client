import NewTweetForm from '../NewTweetForm';
import renderer from 'react-test-renderer';
import { withApiContext, withRouter } from '../../test/utils';
import { Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('NewTweetForm', () => {
  let fakeContext;
  beforeEach(
    () =>
      (fakeContext = {
        tweetService: jest.fn(),
      })
  );

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

  it('type tweet correctly', () => {
    render(
      withApiContext(
        withRouter(<Route path="/" element={<NewTweetForm />} />, {
          state: { id: 'fakeId' },
        }),
        fakeContext
      )
    );

    userEvent.type(screen.getByRole('textbox'), 'fakedTweet');

    const inputElement = screen.getByRole('textbox');
    const inputValue = inputElement.value;
    expect(inputValue).toBe('fakedTweet');
  });
});
