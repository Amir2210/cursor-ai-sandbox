import { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Typography,
  Paper,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editDialog, setEditDialog] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDueDate, setEditDueDate] = useState(null);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [todos]);

  const handleToggleStatus = async (todo) => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${todo.id}`, {
        ...todo,
        status: todo.status === 'completed' ? 'pending' : 'completed',
      });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleEdit = (todo) => {
    setCurrentTodo(todo);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setEditDueDate(todo.dueDate ? new Date(todo.dueDate) : null);
    setEditDialog(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${currentTodo.id}`, {
        title: editTitle,
        description: editDescription,
        dueDate: editDueDate,
        status: currentTodo.status,
      });
      setEditDialog(false);
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <>
      <Paper elevation={3}>
        <List>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              divider
              sx={{
                bgcolor: todo.status === 'completed' ? 'action.hover' : 'background.paper',
              }}
            >
              <Checkbox
                edge="start"
                checked={todo.status === 'completed'}
                onChange={() => handleToggleStatus(todo)}
              />
              <ListItemText
                primary={
                  <Typography
                    variant="h6"
                    sx={{
                      textDecoration: todo.status === 'completed' ? 'line-through' : 'none',
                    }}
                  >
                    {todo.title}
                  </Typography>
                }
                secondary={
                  <>
                    {todo.description && (
                      <Typography variant="body2" color="text.secondary" component="span">
                        {todo.description}
                      </Typography>
                    )}
                    {todo.dueDate && (
                      <Typography variant="caption" color="text.secondary" component="span" sx={{ display: 'block' }}>
                        Due: {format(new Date(todo.dueDate), 'PPP')}
                      </Typography>
                    )}
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleEdit(todo)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDelete(todo.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={editDialog} onClose={() => setEditDialog(false)}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="Due Date"
              type="datetime-local"
              value={editDueDate ? format(editDueDate, "yyyy-MM-dd'T'HH:mm") : ''}
              onChange={(e) => setEditDueDate(e.target.value ? new Date(e.target.value) : null)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TodoList; 