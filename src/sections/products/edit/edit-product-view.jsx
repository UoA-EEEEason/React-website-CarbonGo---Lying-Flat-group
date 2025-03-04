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

import { updateTree, getTreeById } from 'src/firebase/products';

export default function EditProductView() {
  const location = useLocation();
  const { id } = location.state;

  const theme = useTheme();
  const router = useRouter();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState('error');

  useEffect(() => {
    async function fetchData() {
      try {
        let data;

        data = await getTreeById(id);

        if (data && data.name && data.price && data.desc && data.image) {
          setName(data.name);
          setPrice(data.price);
          setDescription(data.desc);
          setImage(data.image);
        } else {
          console.error("Data is null or missing required properties.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [id]);


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
    await updateTree(id, name, price, description, image);
    showAlert('Tree update successfully', 'success');
    setIsLoggingIn(false);
    router.push('/products');
  };

  const handleBack = () => {
    router.back();
  }

  const renderForm = (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          name="name"
          label="Name"
          value={name}
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          name="price"
          label="Price"
          value={price}
          variant="outlined"
          onChange={(e) => setPrice(e.target.value)}
        />

        <TextField
          name="description"
          label="Description"
          multiline
          rows={4}
          value={description}
          variant="outlined"
          onChange={(e) => setDescription(e.target.value)}
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
          <Typography variant="h4" sx={{ mt: 2, mb: 5 }}>Edit the tree</Typography>

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
