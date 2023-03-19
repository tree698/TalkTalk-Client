import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { withApiContext, withRouter } from '../../test/utils';
import Upload from '../Upload';
import { FileUploadToCloudinary } from '../../uploader/FileUploadToCloudinary';

jest.mock('../../components/Navbar');
jest.mock('../../components/Footer');
jest.mock('../../uploader/FileUploadToCloudinary');

describe('Upload', () => {
  const fakeContext = {
    workService: {
      createWork: jest.fn(),
    },
  };

  afterEach(() => fakeContext.workService.createWork.mockReset());

  it('renders correctly', () => {
    const component = renderer.create(
      withApiContext(
        withRouter(<Route path="/" element={<Upload />} />),
        fakeContext
      )
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('display input value correctly', async () => {
    render(
      withApiContext(
        withRouter(<Route path="/" element={<Upload />} />),
        fakeContext
      )
    );

    const inputElement = screen.getByRole('textbox', { name: /title/i });
    userEvent.type(inputElement, 'test');

    await waitFor(() => expect(inputElement).toHaveValue('test'));
  });
});
