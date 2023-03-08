import { render, screen } from '@testing-library/react';
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
            <DisplayDrawing
              checkboxForDelete={false}
              drawing={drawing}
              toBeDeletedId={id}
            />
          }
        />
      )
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('navigate to talk page with drawing info when clicking drawingCard', () => {
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
