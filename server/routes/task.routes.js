import express from 'express';
import { getTasks, createTasks, updateTasks, deleteTasks } from '../controllers/task.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { createTaskValidationRules } from '../utils/validators.js';
import { validate } from "../utils/validate.js";

const router = express.Router();

router.get('/get-all-task', authMiddleware, getTasks);
router.post('/create-task', authMiddleware, createTaskValidationRules(), validate, createTasks);
router.put('/update-task/:id', authMiddleware, updateTasks);
router.delete('/delete-task/:id', authMiddleware, deleteTasks);

export default router;
