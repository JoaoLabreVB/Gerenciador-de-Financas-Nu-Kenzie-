import express from 'express';
import { verifyToken } from '../middlewares/auth.js';
import Task from '../model/Task.js';

const router = express.Router();

router.get('/', verifyToken, (req, res) => {
  try {
    const userTasks = Task.find({ userId: req.userId })
    res.json({ sucess: true, data: userTasks })

  } catch (error) {
    res.status(500).json({
      success: false, error: 'Erro ao buscar tasks'
    })
  }
});

//POST
router.post('/', verifyToken,
  //Validações
  // [
  //   body('description').notEmpty().withMessage('Descrição é obrigatória'),
  //   body('value')
  //     .isFloat({ gt: 0 }).withMessage('Valor deve ser positivo'),
  //   body('type')
  //     .isIn(['entrada', 'saída']).withMessage('Tipo inválido')
  // ],
  async (req, res) => {
    try {
      const { description, value, type } = req.body;
      const task = await Task.create({
        userId: req.userId,
        description,
        value,
        type
      });
      res.status(201).json({
        sucess: true,
        data: task
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro no servidor'
      });
    }
  }
)
export default router;