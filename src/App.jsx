import { Container, Box, IconButton, Tooltip } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { useTheme } from './context/ThemeContext';

function App() {
  const { mode, toggleTheme } = useTheme();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
        <Tooltip title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      <TodoForm />
      <TodoList />
    </Container>
  );
}

export default App; 