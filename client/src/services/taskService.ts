// src/services/taskService.ts
import { Task } from '../models/task.model';
import axiosInstance from '../axiosInstance';

const getToken = () => localStorage.getItem('token');

export const fetchTasks = async (): Promise<Task[]> => {
    try {
        const token = getToken();
        const response = await axiosInstance.get(`/api/task/get-all-task`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

export const createTask = async (task: Task): Promise<Task> => {
    try {
        const token = getToken();
        const response = await axiosInstance.post(`/api/task/create-task`, task, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

export const updateTask = async (task: Task): Promise<Task> => {
    try {
        const token = getToken();
        const response = await axiosInstance.put(`/api/task/update-task/${task._id}`, task, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

export const deleteTask = async (taskId: string): Promise<void> => {
    try {
        const token = getToken();
        await axiosInstance.delete(`/api/task/delete-task/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};
