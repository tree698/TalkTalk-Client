import { render, screen, waitFor } from '@testing-library/react';
import { Route, useLocation } from 'react-router-dom';
import { withRouter } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import DisplayDrawing from '../DisplayDrawing';
import { fakeDrawing as drawing } from '../../test/drawingData';
import renderer from 'react-test-renderer';

describe('DisplayDrawing', () => {
  const { id, fileName, title, username, brush, description, photo } = drawing;

  it('renders correctly without checkboxForDelete', () => {
    const component = renderer.create(
      withRouter(
        <Route
          path="/"
          element={
            <DisplayDrawing checkboxForDelete={false} drawing={drawing} />
          }
        />
      )
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with checkboxForDelete', () => {
    const component = renderer.create(
      withRouter(
        <Route
          path="/"
          element={
            <DisplayDrawing checkboxForDelete={true} drawing={drawing} />
          }
        />
      )
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('navigate to talk page with drawing info when clicking drawingCard', async () => {
    function LocationStateDisplay() {
      return <pre>{JSON.stringify(useLocation().state)}</pre>;
    }
    render(
      withRouter(
        <>
          <Route path="/" element={<DisplayDrawing drawing={drawing} />} />
          <Route path={`/talk`} element={<LocationStateDisplay />} />
        </>
      )
    );

    const card = screen.getByRole('listitem');
    userEvent.click(card);

    await waitFor(() => {
      expect(
        screen.getByText(
          JSON.stringify({
            id,
            fileName,
            title,
            username,
            brush,
            description,
            photo,
          })
        )
      ).toBeInTheDocument();
    });
  });

  it('send toBedeleteId props when checked the checkbox', async () => {
    const mockOnChecked = jest.fn();
    render(
      withRouter(
        <Route
          path="/"
          element={
            <DisplayDrawing
              drawing={drawing}
              checkboxForDelete={true}
              toBeDeletedId={mockOnChecked}
            />
          }
        />
      )
    );

    const checkbox = screen.getByTestId('delete');

    userEvent.click(checkbox);

    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });
    expect(mockOnChecked).toHaveBeenCalledTimes(1);
  });
});
