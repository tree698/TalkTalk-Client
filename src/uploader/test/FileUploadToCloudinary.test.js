import React from 'react';
import { render, screen } from '@testing-library/react';
import { FileUploadToCloudinary } from '../FileUploadToCloudinary';

describe('FileUploadToCloudinary component', () => {
  it('renders without errors', () => {
    render(<FileUploadToCloudinary />);
    expect(screen.getByText(/Drag & Drop Here/i)).toBeInTheDocument();
  });
});
