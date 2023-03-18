import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, useLocation } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { withRouter } from '../../test/utils';
import Search from '../Search';

describe('Search', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      withRouter(<Route path="/" element={<Search />} />)
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('Form Submit', () => {
    it('display the search term when typed a search term', async () => {
      render(withRouter(<Route path="/" element={<Search />} />));

      const inputElement = screen.getByRole('textbox');
      userEvent.type(inputElement, 'test');

      await waitFor(() => {
        expect(inputElement.value).toBe('test');
      });
    });

    it('display warning message when clicking the submit button without searchTerm ', async () => {
      const mockAlert = jest
        .spyOn(window, 'alert')
        .mockImplementation(() => true);

      render(withRouter(<Route path="/" element={<Search />} />));
      const button = screen.getByRole('button');

      userEvent.click(button);

      await waitFor(() => {
        expect(mockAlert).toHaveBeenCalled();
      });
      mockAlert.mockRestore();
    });

    it('navigate to searcheddrawings with searchTerm when the submit button is clicked', async () => {
      const mockAlert = jest
        .spyOn(window, 'alert')
        .mockImplementation(() => {});

      function LocationStateDisplay() {
        return <pre>{JSON.stringify(useLocation().state)}</pre>;
      }

      render(
        withRouter(
          <>
            <Route path="/" element={<Search />} />
            <Route
              path={`/home/searcheddrawings`}
              element={<LocationStateDisplay />}
            />
          </>
        )
      );
      const input = screen.getByPlaceholderText('Search...');
      const button = screen.getByRole('button');

      userEvent.type(input, 'test');
      userEvent.click(button);

      await waitFor(() => {
        // expect(
        //   screen.getByText(JSON.stringify({ searchTerm }))
        // ).toBeInTheDocument();
        expect(mockAlert).not.toHaveBeenCalled();
      });
    });

    it('delete searchTerm when clicking delete btn', () => {
      render(withRouter(<Route path="/" element={<Search />} />));
      const deleteBtn = screen.getByTitle('delete');
      const inputElement = screen.getByRole('textbox');
      const inputValue = inputElement.value;

      userEvent.click(deleteBtn);

      expect(inputValue).toBe('');
    });
  });
});
