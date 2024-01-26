import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import { useRouter } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import InputFileUpload from 'src/components/upload';

import { updateNews, updateMessage, getNewsById, getMessageById } from 'src/firebase/post';

export default function EditPostView() {
  const location = useLocation();
  const { id, Role } = location.state;

  const theme = useTheme();
  const router = useRouter();

  const [role, setRole] = useState('News');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState('error');

  useEffect(() => {
    async function fetchData() {
      try {
        let data;

        if (Role === 'News') {
          data = await getNewsById(id);
        } else if (Role === 'Message') {
          data = await getMessageById(id);
        } else {
          console.error("Unknown Role:", Role);
          return;
        }

        if (data && data.title && data.content && data.image) {
          setTitle(data.title);
          setContent(data.content);
          setImage(data.image);
          setRole(Role);
        } else {
          console.error("Data is null or missing required properties.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [id, Role]);


  const showAlert = (message, severity = 'error') => {
    setAlertMessage(message);
    setAlertSeverity(severity);
  };

  const handleCloseAlert = () => {
    setAlertMessage(null);
  };

  const handleFileUpload = (url) => {
    setImage(url);
    showAlert('File uploaded successfully!', 'success');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoggingIn(true);
    if (role === 'Message') {
      await updateMessage(id, title, content);
      showAlert('Message update successfully', 'success');
    } else if (role === 'News') {
      await updateNews(id, title, content, image);
      showAlert('News update successfully', 'success');
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

        <TextField
          name="role"
          label="Role"
          value={role}
          variant="outlined"
        />

        <TextField
          name="content"
          label="Content"
          multiline
          rows={4}
          value={content}
          variant="outlined"
          onChange={(e) => setContent(e.target.value)}
        />

        <InputFileUpload onFileUpload={handleFileUpload} />
      </Stack>

      <LoadingButton
        fullWidth
        sx={{ my: 3 }}
        size="large"
        type="update"
        variant="contained"
        color="inherit"
        disabled={isLoggingIn}
      >
        {isLoggingIn ? <CircularProgress size={24} /> : "Update"}
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
          <Typography variant="h4" sx={{ mt: 2, mb: 5 }}>Edit the {Role==='News'?'News':'Message'}</Typography>

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
