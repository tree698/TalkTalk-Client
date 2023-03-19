import { render, screen } from '@testing-library/react';
import { fakeImageData } from '../../test/imageData';
import { withApiContext, withQuery } from '../../test/utils';
import ImageSlide from '../ImageSlide';

jest.mock('react-hot-toast');
const fakeContext = {
  workService: {
    showWorks: jest.fn(),
  },
};

describe('ImageSlide', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading state while fetching images', () => {
    render(withQuery(withApiContext(<ImageSlide />, fakeContext)));

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render images if fetched successfully', async () => {
    fakeContext.workService.showWorks.mockImplementation(fakeImageData);

    render(withQuery(withApiContext(<ImageSlide />, fakeContext)));

    expect(fakeContext.workService.showWorks).toHaveBeenCalledTimes(1);
    expect(fakeContext.workService.showWorks).toHaveBeenCalledWith(4, 0);
  });
});
