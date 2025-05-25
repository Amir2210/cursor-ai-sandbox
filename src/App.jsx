import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container, Box, IconButton, Tooltip } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from './context/ThemeContext';

// Import pages
import Login from './pages/Login';
import Register from './pages/Register';
import TodoList from './pages/TodoList';
import Landing from './pages/Landing';

// Import components
import Navbar from './components/Navbar';

const isAuthenticated = () => !!localStorage.getItem('token');

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  return !isAuthenticated() ? children : <Navigate to="/todos" />;
};

function App() {
  const { mode, toggleTheme } = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#1a202c' }}>
      <Navbar />
      <Box sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Container maxWidth="sm" sx={{ py: 4 }}>
                  <Login />
                </Container>
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Container maxWidth="sm" sx={{ py: 4 }}>
                  <Register />
                </Container>
              </PublicRoute>
            }
          />
          <Route
            path="/todos"
            element={
              <PrivateRoute>
                <Box sx={{ background: 'linear-gradient(to bottom, #1a202c, #283548)', minHeight: '100%', py: 4 }}>
                  <Container maxWidth="md">
                    <TodoList />
                  </Container>
                </Box>
              </PrivateRoute>
            }
          />
        </Routes>
      </Box>
    </Box>
  );
}

export default App; 