import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { bgGradient } from 'src/theme/css';
import { auth, firestore } from 'src/firebaseConfig';
import Iconify from 'src/components/iconify';

export default function LoginView() {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null); // 新增状态，用于跟踪当前用户

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const userRef = firestore.collection('user').doc(user.uid);
      const doc = await userRef.get();
      if (doc.exists && doc.data().role === 'web') {
        setCurrentUser(user); // 设置当前用户
      } else {
        console.log('User role is not web, logging out...');
        await auth.signOut();
        setCurrentUser(null); // 登出并重置用户
      }
    } catch (error) {
      console.error("Error signing in: ", error);
      alert(`Login failed: ${error.message}`);
      setCurrentUser(null); // 登录失败，重置用户
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setCurrentUser(null); // 登出并重置用户
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const renderForm = (
    <form onSubmit={handleLogin}>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        fullWidth
        sx={{ my: 3 }}
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
      >
        Login
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
          <Typography variant="h4">Sign in to Lying Flat</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Welcome to backend system
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {currentUser ? `Logged in as ${currentUser.email}` : "No user"}
          </Typography>

          {renderForm}

          <LoadingButton
            fullWidth
            size="large"
            variant="contained"
            color="inherit"
            onClick={handleLogout}
          >
            Logout
          </LoadingButton>
        </Card>
      </Stack>
    </Box>
  );
}
