import { uploadImage } from '../uploader';

describe('uploadImage', () => {
  it('should upload an image', async () => {
    const mockResponse = {
      secure_url: 'https://example.com/image.jpg',
      public_id: 'image',
    };

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const result = await uploadImage(file);

    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(process.env.REACT_APP_CLOUDINARY_URL, {
      method: 'POST',
      body: expect.any(FormData),
    });
  });
});
