import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  Box,
  Paper,
  Stack
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    dueDate: null
  });
  const [editDialog, setEditDialog] = useState({
    open: false,
    todo: null,
    title: '',
    description: '',
    dueDate: null
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/todos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;

    try {
      const token = localStorage.getItem('token');
      console.log('Sending todo data:', newTodo); // Debug log
      console.log('Auth token:', token); // Debug log

      const response = await axios.post(
        'http://localhost:5000/api/todos',
        {
          title: newTodo.title.trim(),
          description: newTodo.description?.trim() || null,
          dueDate: newTodo.dueDate
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Todo created successfully:', response.data); // Debug log
      setTodos([response.data, ...todos]);
      setNewTodo({ title: '', description: '', dueDate: null });
    } catch (error) {
      console.error('Error adding todo:', error.response?.data || error.message);
      // Show error to user
      alert(error.response?.data?.message || 'Error creating todo');
    }
  };

  const handleToggleTodo = async (id, completed) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/todos/${id}`,
        { completed: !completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos(todos.map(todo => todo.id === id ? response.data : todo));
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleEditTodo = async () => {
    if (!editDialog.title.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/todos/${editDialog.todo.id}`,
        {
          title: editDialog.title,
          description: editDialog.description,
          dueDate: editDialog.dueDate
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos(todos.map(todo => todo.id === editDialog.todo.id ? response.data : todo));
      setEditDialog({ open: false, todo: null, title: '', description: '', dueDate: null });
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleString();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          My Todo List
        </Typography>

        <Box component="form" onSubmit={handleAddTodo} sx={{ mb: 3 }}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Title"
              value={newTodo.title}
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              required
            />
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Description"
              value={newTodo.description}
              onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
              multiline
              rows={2}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Due Date"
                value={newTodo.dueDate}
                onChange={(newValue) => setNewTodo({ ...newTodo, dueDate: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Add Todo
            </Button>
          </Stack>
        </Box>

        <List>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              sx={{
                mb: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
                '&:hover': {
                  bgcolor: 'action.hover'
                }
              }}
            >
              <Checkbox
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id, todo.completed)}
              />
              <ListItemText
                primary={
                  <Typography
                    variant="h6"
                    sx={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed ? 'text.secondary' : 'text.primary'
                    }}
                  >
                    {todo.title}
                  </Typography>
                }
                secondary={
                  <Box>
                    {todo.description && (
                      <Typography variant="body2" color="text.secondary" component="div">
                        {todo.description}
                      </Typography>
                    )}
                    {todo.dueDate && (
                      <Typography variant="body2" color="text.secondary" component="div">
                        Due: {new Date(todo.dueDate).toLocaleDateString()}
                      </Typography>
                    )}
                    <Typography variant="caption" color="text.secondary" component="div">
                      Created by: {todo.User?.username}
                    </Typography>
                  </Box>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => setEditDialog({
                    open: true,
                    todo,
                    title: todo.title,
                    description: todo.description || '',
                    dueDate: todo.dueDate ? new Date(todo.dueDate) : null
                  })}
                  sx={{ mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Dialog
          open={editDialog.open}
          onClose={() => setEditDialog({ open: false, todo: null, title: '', description: '', dueDate: null })}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                autoFocus
                fullWidth
                label="Title"
                value={editDialog.title}
                onChange={(e) => setEditDialog({ ...editDialog, title: e.target.value })}
                required
              />
              <TextField
                fullWidth
                label="Description"
                value={editDialog.description}
                onChange={(e) => setEditDialog({ ...editDialog, description: e.target.value })}
                multiline
                rows={2}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Due Date"
                  value={editDialog.dueDate}
                  onChange={(newValue) => setEditDialog({ ...editDialog, dueDate: newValue })}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialog({ open: false, todo: null, title: '', description: '', dueDate: null })}>
              Cancel
            </Button>
            <Button onClick={handleEditTodo} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default TodoList; 