import ImageSlide from '../ImageSlide';
import renderer from 'react-test-renderer';
import { withRouter } from '../../test/utils';
import { Route } from 'react-router-dom';
import Heading from '../Heading';

jest.mock('../ImageSlide');

describe('Heading', () => {
  ImageSlide.mockImplementation(() => jest.fn());

  it('renders correctly', () => {
    const component = renderer.create(
      withRouter(<Route path="/" element={<Heading />} />)
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
