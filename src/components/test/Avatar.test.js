import { render, screen } from '@testing-library/react';
import { Route } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { withRouter } from '../../test/utils';
import Avatar from '../Avatar';

describe('Avatar', () => {
  it('renders correctly with photo', () => {
    const component = renderer.create(
      withRouter(<Route path="/" element={<Avatar photo={true} />} />)
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('display photo', () => {
    render(withRouter(<Route path="/" element={<Avatar photo={'photo'} />} />));

    const image = screen.getByRole('img');
    expect(image.src).toBe('http://localhost/photo');
  });

  it('display username', () => {
    render(
      withRouter(<Route path="/" element={<Avatar username={'username'} />} />)
    );

    expect(screen.getByText('u')).toBeInTheDocument();
  });
});
