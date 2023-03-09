import { render, screen } from '@testing-library/react';
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
    it('display the search term when typed a search term', () => {
      render(withRouter(<Route path="/" element={<Search />} />));
      const input = screen.getByPlaceholderText('Search...');

      userEvent.type(input, 'test');
      const inputElement = screen.getByRole('textbox');
      const inputValue = inputElement.value;
      expect(inputValue).toBe('test');
    });

    it('navigate to searcheddrawings with searchTerm when the submit button is clicked', () => {
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

      expect(
        screen.getByText(JSON.stringify({ searchTerm: 'test' }))
      ).toBeInTheDocument();
    });

    it('display warning message when clicking the submit button without searchTerm ', () => {
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
      const button = screen.getByRole('button');

      userEvent.click(button);

      expect(mockAlert).toHaveBeenCalled();
      mockAlert.mockRestore();
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
