import { render, screen } from '@testing-library/react';
import { Route } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { withRouter } from '../../../test/utils';

import Banner from '../Banner';

describe('Banner', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      withRouter(<Route path="/" element={<Banner />} />)
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('display correctly the word received', () => {
    render(withRouter(<Route path="/" element={<Banner text={'test'} />} />));

    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
