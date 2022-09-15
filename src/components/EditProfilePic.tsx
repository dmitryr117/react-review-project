/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';

const EditProfilePic = ({ changeFcn }: any) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length == 1) {
      setSelectedFile(e.target.files[0]);
      setIsFilePicked(true);
    }
  };

  const submitFile = async () => {
    const formData = new FormData();

    console.log('Cookies: ', document.cookie);

    formData.append('File', selectedFile!);

    try {
      const response = await fetch('https://api.ptcore.test/images', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      const result = await response.json();
      console.log('Success: ', result);
      changeFcn(false);
    } catch (err: any) {
      console.error('Error: ', err);
    }
  };

  return (
    <div>
      <h1>EditProfilePic</h1>
      <input type="file" name="file" onChange={fileChangeHandler} />
      <div>
        <button onClick={submitFile}>Submit</button>
        <button onClick={() => changeFcn(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default EditProfilePic;
