import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import { useRouter } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import InputFileUpload from 'src/components/upload';

import { postNewMessage, postNews } from 'src/firebase/post';

export default function NewPostView() {
  const theme = useTheme();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [role, setRole] = useState('');
  const [image, setImage] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState('error');

  const showAlert = (message, severity = 'error') => {
    setAlertMessage(message);
    setAlertSeverity(severity);
  };

  const handleCloseAlert = () => {
    setAlertMessage(null);
  };

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleFileUpload = (url) => {
    setImage(url);
    setIsFileUploaded(true);
    showAlert('File uploaded successfully!','success');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!role) {
      showAlert('Please select a role before submitting.');
      return;
    }

    if (!isFileUploaded && (role === 'News') ) {
      showAlert('Please upload a file before submitting.');
      return;
    }

    setIsLoggingIn(true);
    if (role === 'Message') {
      await postNewMessage(title, content);
      showAlert('Message added successfully','success');
    } else if (role === 'News') {
      await postNews(title, content, image);
      showAlert('News added successfully','success');
    }
    setIsLoggingIn(false);
    router.push('/post');
  };

  const handleBack = () => {
    router.back();
  }

  const renderForm = (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          name="title"
          label="Title"
          value={title}
          variant="outlined"
          onChange={(e) => setTitle(e.target.value)}
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={role}
            label="Role"
            onChange={handleChange}
          >
            <MenuItem value={'News'}>News</MenuItem>
            <MenuItem value={'Message'}>Message</MenuItem>
          </Select>
        </FormControl>

        <TextField
          name="content"
          label="Content"
          multiline
          rows={4}
          value={content}
          variant="outlined"
          onChange={(e) => setContent(e.target.value)}
        />

        <InputFileUpload onFileUpload={handleFileUpload}/>
      </Stack>

      <LoadingButton
        fullWidth
        sx={{ my: 3 }}
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        disabled={isLoggingIn}
      >
        {isLoggingIn ? <CircularProgress size={24} /> : "Submit"}
      </LoadingButton>

      <LoadingButton
        fullWidth
        size="large"
        type="back"
        variant="contained"
        color="inherit"
        onClick={handleBack}
      >
        {isLoggingIn ? <CircularProgress size={24} /> : "Back"}
      </LoadingButton>
    </form>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" sx={{ mt: 2, mb: 5 }}>Create a new post</Typography>

          {renderForm}

          <Snackbar open={Boolean(alertMessage)} autoHideDuration={6000} onClose={handleCloseAlert} >
            <Alert severity={alertSeverity} onClose={handleCloseAlert}>
              {alertMessage}
            </Alert>
          </Snackbar>

        </Card>
      </Stack>
    </Box>
  );
}
