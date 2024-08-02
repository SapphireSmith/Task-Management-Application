// src/components/TaskModal.tsx
import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import { Task } from '../models/task.model';
import { format } from 'date-fns';

interface TaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (task: Task) => void;
  initialTask?: Task;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onRequestClose, onSubmit, initialTask }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Low');

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setDeadline(format(new Date(initialTask.deadline), 'yyyy-MM-dd'));
      setPriority(initialTask.priority);
    } else {
      // Reset to default values when adding a new task
      setTitle('');
      setDescription('');
      setDeadline(format(new Date(), 'yyyy-MM-dd'));
      setPriority('Low');
    }
  }, [initialTask, isOpen]); // Add `isOpen` dependency to ensure reset when modal opens

  const handleSubmit = () => {
    const task: Task = {
      _id: initialTask?._id || '',
      title,
      description,
      deadline: new Date(deadline).toISOString(),
      priority,
    };
    onSubmit(task);
    onRequestClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onRequestClose}
      maxWidth={isLargeScreen ? 'md' : 'sm'}
      fullWidth={true}
    >
      <DialogTitle>{initialTask ? 'Edit Task' : 'Add Task'}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <TextField
            label="Deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            label="Priority"
            select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'High' | 'Medium' | 'Low')}
            required
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onRequestClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {initialTask ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;
