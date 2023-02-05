import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useApiContext } from '../context/ApiContext';
import { useNavigate } from 'react-router-dom';
import { FileUpload } from '../components/FileUpload';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Button from '../components/ui/Button';
import Banner from '../components/ui/Banner';

export default function Upload() {
  const [info, setInfo] = useState({ title: '', description: '', brush: '' });
  const [fileName, setFileName] = useState('');
  const [originalName, setOriginalName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const { workService } = useApiContext();
  const navigate = useNavigate();

  const handlePhoto = (photo) => {
    setFileName((prev) => photo.fileName);
    setOriginalName((prev) => photo.originalName);
  };

  const handleCancel = () => {
    setFileName('');
    setOriginalName();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    workService
      .createWork(
        info.title,
        info.description,
        info.brush,
        originalName,
        fileName
      )
      .then(() => {
        setSuccess('Successfully Uploaded!');
        setTimeout(() => {
          setSuccess(undefined);
        }, 3000);
        setTimeout(() => {
          navigate('/home');
        }, 3000);
      })
      .catch((error) => setError((prev) => error.toString()))
      .finally(() => setIsLoading(false));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfo((prev) => ({ ...info, [name]: value }));
  };

  return (
    <>
      <Navbar />
      <h2>Upload your painting</h2>
      <FileUpload sendPhoto={handlePhoto} />
      <div>
        {fileName ? (
          <img
            src={`${process.env.REACT_APP_BASE_URL}/uploaded_images/${fileName}`}
            alt={info.title}
          />
        ) : (
          <AiOutlinePlus />
        )}
      </div>
      <div>
        {fileName && (
          <div>
            {isLoading && <Banner text="Loading..." />}
            {success && <Banner text={success} />}
            {error && <Banner text={error} />}
            <Button text="Want to cancel?" onClick={handleCancel} />
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label> <br />
        <input
          type="text"
          name="title"
          value={info.title}
          onChange={handleChange}
          placeholder="Title"
          id="title"
          required
        />
        <br />
        <label htmlFor="brush">Brush</label> <br />
        <input
          type="text"
          name="brush"
          value={info.brush}
          onChange={handleChange}
          placeholder="(Optional) Brush"
          id="brush"
        />
        <br />
        <label htmlFor="description">Say something</label>
        <br />
        <textarea
          name="description"
          value={info.description}
          onChange={handleChange}
          cols="30"
          rows="3"
          placeholder="(Optional) Say something"
          id="description"
        ></textarea>
        <br />
        <Button text="Submit" />
      </form>
      <Footer />
    </>
  );
}
