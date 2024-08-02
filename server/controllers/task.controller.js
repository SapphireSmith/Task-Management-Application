import Task from '../models/task.model.js';

// Get all tasks for the authenticated user
export const getTasks = async (req, res) => {
    try {
        // Find tasks for the authenticated user, excluding the userId field
        const tasks = await Task.find({ userId: req.userId }).select('-userId');
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new task for the authenticated user
export const createTasks = async (req, res) => {
    const { title, description, priority, deadline } = req.body;

    try {
        const task = new Task({
            title,
            description,
            priority,
            deadline: new Date(deadline),
            userId: req.userId // Attach user ID
        });

        await task.save();
        console.log(task);
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a task if it belongs to the authenticated user
export const updateTasks = async (req, res) => {
    const { id } = req.params;
    const { title, description, priority, deadline } = req.body;

    try {
        const task = await Task.findOneAndUpdate(
            { _id: id, userId: req.userId }, // Filter by user ID
            { title, description, priority, deadline: new Date(deadline) },
            { new: true } // Return the updated document
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found or not authorized' });
        }

        console.log(task);

        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a task if it belongs to the authenticated user
export const deleteTasks = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findOneAndDelete({ _id: id, userId: req.userId }); // Filter by user ID

        if (!task) {
            return res.status(404).json({ message: 'Task not found or not authorized' });
        }
        console.log(task);

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
