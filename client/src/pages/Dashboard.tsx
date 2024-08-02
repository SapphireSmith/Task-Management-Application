// src/pages/Dashboard.tsx

import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import TaskList from '../components/TaskList';
import TaskModal from '../components/TaskModal';
import SearchBar from '../components/SearchBar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Task } from '../models/task.model';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { format } from 'date-fns';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);

  const getTasks = async () => {
    try {
      const tasks = await fetchTasks();
      const formattedTasks = tasks.map(task => ({
        ...task,
        deadline: format(new Date(task.deadline), 'yyyy-MM-dd'),
      }));
      setTasks(formattedTasks);
      setFilteredTasks(formattedTasks);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    }
  };
  useEffect(() => {
    getTasks();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setTaskToEdit(undefined);
  };

  const handleAddTask = async (task: Task) => {
    try {
      const newTask = await createTask({ ...task });
      setTasks([...tasks, newTask]);
      setFilteredTasks([...tasks, newTask]);
      getTasks();
      toast.success('Task added successfully!');
    } catch (error: any) {
      console.log();

      toast.error(`${error.response.data.msg || 'Failed to add task'}`);
    }
  };

  const handleEditTask = async (task: Task) => {
    try {
      const updatedTask = await updateTask(task);
      const updatedTasks = tasks.map(t => (t._id === updatedTask._id ? updatedTask : t));
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
      getTasks();
      toast.success('Task updated successfully!');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      const updatedTasks = tasks.filter(task => task._id !== taskId);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
      getTasks();
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete task');
    }
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
          setTaskToEdit(task);
          openModal();
        }}
        onDelete={handleDeleteTask}
      />
      <ToastContainer />
      <TaskModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onSubmit={isEditing ? handleEditTask : handleAddTask}
        initialTask={isEditing ? taskToEdit : undefined}
      />
    </Container>
  );
};

export default Dashboard;
