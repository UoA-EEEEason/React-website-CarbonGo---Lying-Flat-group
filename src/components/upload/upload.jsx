import React, { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import { handleUpload } from 'src/firebase/post';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload({ onFileUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const onUpload = () => {
    handleUpload(
      file,
      (url) => {
        onFileUpload(url);
      }
    );
  };

  useEffect(() => {
    if (file) {
      onUpload();
    }
  }, [file]);

  return (
    <Button component="label" variant="contained">
      Upload image
      <VisuallyHiddenInput type="file" onChange={handleFileChange} />
    </Button>
  );
}
