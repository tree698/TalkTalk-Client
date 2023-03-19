import renderer from 'react-test-renderer';
import { withApiContext } from '../../test/utils';
import MyDrawings from '../MyDrawings';
import DisplayDrawing from '../../components/DisplayDrawing';
import { fakeDrawings } from '../../test/drawingData';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

jest.mock('../../components/DisplayDrawing');
jest.mock('../../components/ui/Banner');

describe('MyDrawings', () => {
  const fakeContext = {
    user: jest.fn(),
    workService: {
      getWorks: jest.fn(),
    },
  };

  afterEach(() => fakeContext.workService.getWorks.mockReset());

  it('renders correctly', () => {
    const component = renderer.create(
      withApiContext(<MyDrawings />, fakeContext)
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('display my drawings', async () => {
    fakeContext.workService.getWorks.mockImplementation(() =>
      Promise.resolve(fakeDrawings)
    );

    DisplayDrawing.mockImplementation((fakeDrawing) => (
      <pre>{JSON.stringify(fakeDrawing)}</pre>
    ));

    await act(async () => {
      render(withApiContext(<MyDrawings />, fakeContext));
    });

    expect(
      screen.getByText(
        JSON.stringify({ drawing: fakeDrawings[0], checkboxForDelete: true })
      )
    ).toBeInTheDocument();
  });
});
