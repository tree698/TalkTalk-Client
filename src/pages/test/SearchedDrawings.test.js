import { Route } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { withApiContext, withRouter } from '../../test/utils';
import SearchedDrawings from '../SearchedDrawings';
import DisplayDrawing from '../../components/DisplayDrawing';
import { fakeDrawings } from '../../test/drawingData';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

jest.mock('../../components/DisplayDrawing');
jest.mock('../../components/ui/Banner');

describe('SearchedDrawings', () => {
  const fakeContext = {
    workService: {
      searchWorks: jest.fn(),
    },
  };

  afterEach(() => fakeContext.workService.searchWorks.mockReset());

  it('renders correctly', () => {
    const component = renderer.create(
      withApiContext(
        withRouter(<Route path="/" element={<SearchedDrawings />} />, {
          state: {
            searchTerm: 'test',
          },
        }),
        fakeContext
      )
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('display searched drawings', async () => {
    fakeContext.workService.searchWorks.mockImplementation(() =>
      Promise.resolve(fakeDrawings)
    );

    DisplayDrawing.mockImplementation((fakeDrawing) => (
      <pre>{JSON.stringify(fakeDrawing)}</pre>
    ));

    await act(async () => {
      render(
        withApiContext(
          withRouter(<Route path="/" element={<SearchedDrawings />} />, {
            state: {
              searchTerm: 'test',
            },
          }),
          fakeContext
        )
      );
    });

    expect(
      screen.getByText(JSON.stringify({ drawing: fakeDrawings[0] }))
    ).toBeInTheDocument();
  });
});
