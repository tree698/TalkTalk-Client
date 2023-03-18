import ViewMore from '../ViewMore';
import renderer from 'react-test-renderer';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ViewMore', () => {
  it('renders with button', () => {
    const component = renderer.create(
      <ViewMore lengthDrawings={3} limit={3} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders without button', () => {
    const component = renderer.create(
      <ViewMore lengthDrawings={2} limit={3} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('send client event', async () => {
    const mockOnClick = jest.fn();
    render(
      <ViewMore lengthDrawings={3} limit={3} onButtonClick={mockOnClick} />
    );

    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
