import express from 'express';
import { verifyToken } from '../middlewares/auth.js';
import { tasks } from '../config/db.js';

const router = express.Router();

router.get('/', verifyToken, (req, res) => {
  const userTasks = tasks.filter(t => t.userId == req.userId);
  res.json(userTasks);
});

export default router;