import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper, Avatar, LinearProgress, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

const mockTasks = [
  {
    title: 'Create 2 Landing Page',
    progress: 75,
    urgent: true,
  },
  {
    title: 'Doing Assignment: Convex Geometry Master Class',
    progress: 40,
    urgent: false,
  },
  {
    title: 'Making Brownies for his birthday cakes',
    progress: 100,
    urgent: false,
  },
];

const Landing = () => {
  const theme = useTheme();
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', position: 'relative', overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pt: 10,
          pb: 6,
          background: 'radial-gradient(circle at 50% 0%, #1976d2 0%, #111 100%)',
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 900,
            fontSize: { xs: '2.2rem', md: '3.5rem' },
            textAlign: 'center',
            color: 'white',
            letterSpacing: '-2px',
            mb: 2,
            textShadow: '0 4px 32px #1976d2, 0 1px 0 #000',
            zIndex: 2,
          }}
        >
          Boost Your Productivity<br />with Produktify
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 4, zIndex: 2 }}>
          <Button
            component={RouterLink}
            to="/register"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ fontWeight: 700, px: 4, borderRadius: 3 }}
          >
            Get Started
          </Button>
          <Button
            component={RouterLink}
            to="/login"
            variant="outlined"
            color="inherit"
            size="large"
            sx={{ fontWeight: 700, px: 4, borderRadius: 3, borderColor: 'white', color: 'white' }}
          >
            Login
          </Button>
        </Box>
        {/* Phone Mockup */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: 260, sm: 320 },
            height: { xs: 520, sm: 600 },
            mx: 'auto',
            borderRadius: '36px',
            boxShadow: '0 8px 40px 8px #000a',
            background: '#181c24',
            p: 2,
            zIndex: 2,
            mt: 2,
            mb: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Typography variant="subtitle2" color="#aaa" sx={{ mb: 1, mt: 1 }}>
            Getting things done today
          </Typography>
          <Box sx={{ width: '100%', mb: 2 }}>
            <Typography variant="body2" color="#fff" sx={{ fontWeight: 700, mb: 1 }}>
              Urgent Task
            </Typography>
            <Paper elevation={2} sx={{ bgcolor: '#23283a', p: 2, mb: 2, borderRadius: 3 }}>
              <Typography variant="body1" color="#fff" sx={{ fontWeight: 600 }}>
                {mockTasks[0].title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={mockTasks[0].progress}
                  sx={{ flex: 1, height: 8, borderRadius: 5, bgcolor: '#222', '& .MuiLinearProgress-bar': { bgcolor: '#1976d2' } }}
                />
                <Typography variant="caption" color="#fff" sx={{ ml: 1 }}>
                  {mockTasks[0].progress}%
                </Typography>
              </Box>
            </Paper>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Typography variant="body2" color="#fff" sx={{ fontWeight: 700, mb: 1 }}>
              Remaining Task
            </Typography>
            <Paper elevation={1} sx={{ bgcolor: '#23283a', p: 2, mb: 2, borderRadius: 3 }}>
              <Typography variant="body1" color="#fff" sx={{ fontWeight: 600 }}>
                {mockTasks[1].title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={mockTasks[1].progress}
                  sx={{ flex: 1, height: 8, borderRadius: 5, bgcolor: '#222', '& .MuiLinearProgress-bar': { bgcolor: '#1976d2' } }}
                />
                <Typography variant="caption" color="#fff" sx={{ ml: 1 }}>
                  {mockTasks[1].progress}%
                </Typography>
              </Box>
            </Paper>
            <Paper elevation={1} sx={{ bgcolor: '#23283a', p: 2, borderRadius: 3 }}>
              <Typography variant="body1" color="#fff" sx={{ fontWeight: 600 }}>
                {mockTasks[2].title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={mockTasks[2].progress}
                  sx={{ flex: 1, height: 8, borderRadius: 5, bgcolor: '#222', '& .MuiLinearProgress-bar': { bgcolor: '#1976d2' } }}
                />
                <Typography variant="caption" color="#fff" sx={{ ml: 1 }}>
                  {mockTasks[2].progress}%
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>
        {/* Floating Progress Card */}
        <Paper elevation={6} sx={{ position: 'absolute', right: { xs: 16, md: 80 }, top: { xs: 40, md: 80 }, bgcolor: '#23283a', p: 2, borderRadius: 3, minWidth: 120, zIndex: 3, display: { xs: 'none', sm: 'block' } }}>
          <Typography variant="subtitle2" color="#fff" sx={{ mb: 1 }}>
            Progress
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <Box sx={{ width: 60, height: 60, borderRadius: '50%', bgcolor: '#181c24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5" color="#1976d2">
                  75%
                </Typography>
              </Box>
            </Box>
            <Typography variant="caption" color="#aaa">
              Total progress of all your task
            </Typography>
          </Box>
        </Paper>
        {/* Floating User Card */}
        <Paper elevation={6} sx={{ position: 'absolute', left: { xs: 16, md: 80 }, bottom: { xs: 16, md: 80 }, bgcolor: '#23283a', p: 2, borderRadius: 3, minWidth: 220, display: 'flex', alignItems: 'center', gap: 2, zIndex: 3 }}>
          <Avatar src="https://randomuser.me/api/portraits/women/44.jpg" alt="Airisha Chituru" sx={{ width: 48, height: 48 }} />
          <Box>
            <Typography variant="body2" color="#fff">
              Task has been completed
            </Typography>
            <Typography variant="caption" color="#aaa">
              by Airisha Chituru
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                Easy to Use
              </Typography>
              <Typography color="text.secondary">
                Simple and intuitive interface to manage your tasks efficiently
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <SecurityIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                Secure
              </Typography>
              <Typography color="text.secondary">
                Your data is protected with secure authentication
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <SpeedIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                Fast & Responsive
              </Typography>
              <Typography color="text.secondary">
                Quick access to your tasks from any device
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Landing; 