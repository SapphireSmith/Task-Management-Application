import React, { useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import TaskList from '../components/TaskList';
import TaskModal from '../components/TaskModal';
import SearchBar from '../components/SearchBar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Task } from '../models/task.model';

const Dashboard: React.FC = () => {
  // Initialize tasks with some dummy data
  const initialTasks: Task[] = [
    {
      id: '1',
      title: 'Complete React Project',
      description: 'Finish the dashboard and integrate APIs.',
      priority: 'High',
      deadline: '2024-08-15',
    },
    {
      id: '2',
      title: 'Read TypeScript Documentation',
      description: 'Understand advanced types and features.',
      priority: 'Medium',
      deadline: '2024-08-30',
    },
    {
      id: '3',
      title: 'Update Resume',
      description: 'Add new projects and skills.',
      priority: 'Low',
      deadline: '2024-09-01',
    },
  ];

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setTaskToEdit(undefined);
  };

  const handleAddTask = (task: Task) => {
    const newTask = { ...task, id: Date.now().toString() };
    setTasks([...tasks, newTask]);
    setFilteredTasks([...tasks, newTask]);
    toast.success('Task added successfully!');
  };

  const handleEditTask = (task: Task) => {
    const updatedTasks = tasks.map(t => (t.id === task.id ? task : t));
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    setIsEditing(false);
    setTaskToEdit(undefined);
    toast.success('Task updated successfully!');
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    toast.success('Task deleted successfully!');
  };

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task => task.title.toLowerCase().includes(query.toLowerCase())));
    }
  };

  return (
    <Container>
      <Typography variant="h4" mt={4} gutterBottom>
        Manage Your Tasks
      </Typography>
      <Box my={4}>
        <SearchBar onSearch={handleSearch} />
      </Box>
      <Box mb={3} display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={openModal}>
          Add Task
        </Button>
      </Box>
      <TaskList
        tasks={filteredTasks}
        onEdit={(task) => {
          setIsEditing(true);
          setTaskToEdit(task); // Ensure this task matches the type expected in TaskModal
          openModal();
        }}
        onDelete={handleDeleteTask}
      />
      <ToastContainer />
      <TaskModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onSubmit={isEditing ? handleEditTask : handleAddTask}
        initialTask={isEditing ? taskToEdit : undefined} // Pass undefined when no task is being edited
      />
    </Container>
  );
};

export default Dashboard;
