import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Button, TextField, Box, useTheme, useMediaQuery } from '@mui/material';
import { Task } from '../models/task.model';

Modal.setAppElement('#root'); // Accessibility: Set the app root element for screen readers

interface TaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (task: Task) => void;
  initialTask?: Task;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onRequestClose, onSubmit, initialTask }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [deadline, setDeadline] = useState<string>('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setPriority(initialTask.priority);
      setDeadline(initialTask.deadline);
    }
  }, [initialTask]);

  const handleSubmit = () => {
    if (!title || !description || !deadline) {
      alert('Please fill in all fields');
      return;
    }

    const task: Task = {
      id: initialTask ? initialTask.id : new Date().toISOString(), // Generate a new ID for new tasks
      title,
      description,
      priority,
      deadline,
    };

    onSubmit(task);
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setDeadline('');
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel={initialTask ? 'Edit Task' : 'Add New Task'}
      style={{
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '90%' : '400px',
          maxWidth: '600px',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <h2>{initialTask ? 'Edit Task' : 'Add New Task'}</h2>
      <TextField
        label="Title"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Description"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Priority"
        select
        fullWidth
        margin="normal"
        value={priority}
        onChange={(e) => setPriority(e.target.value as 'High' | 'Medium' | 'Low')}
        SelectProps={{
          native: true,
        }}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </TextField>
      <TextField
        label="Deadline"
        type="date"
        fullWidth
        margin="normal"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Box mt={2} display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={2}>
        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth={isMobile}>
          {initialTask ? 'Save Changes' : 'Add Task'}
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClose} fullWidth={isMobile}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default TaskModal;
