// src/components/TaskList.tsx

import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, ListItemSecondaryAction, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationModal from './ConfirmationModal';

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  deadline: string;
}

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const openConfirmationModal = (taskId: string) => {
    setTaskToDelete(taskId);
    setIsModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsModalOpen(false);
    setTaskToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      onDelete(taskToDelete);
      closeConfirmationModal();
    }
  };

  return (
    <>
      <List>
        {tasks.map((task) => (
          <ListItem key={task._id} divider>
            <ListItemText
              primary={task.title}
              secondary={
                <>
                  <Typography variant="body2" color="textSecondary">
                    {task.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Priority: {task.priority}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Deadline: {task.deadline}
                  </Typography>
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => onEdit(task)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => openConfirmationModal(task._id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <ConfirmationModal
        isOpen={isModalOpen}
        onRequestClose={closeConfirmationModal}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this task?"
      />
    </>
  );
};

export default TaskList;
