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

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Cria uma nova transação financeira
 *     description: Endpoint para registrar entradas/saídas financeiras
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *           examples:
 *             exemploEntrada:
 *               value:
 *                 description: "Salário mensal"
 *                 value: 3500.50
 *                 type: "entrada"
 *             exemploSaida:
 *               value:
 *                 description: "Pagamento de conta"
 *                 value: 150.75
 *                 type: "saída"
 *     responses:
 *       201:
 *         description: Task criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *       400:
 *         description: Erros de validação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Não autorizado (token inválido/expirado)
 *       500:
 *         description: Erro interno no servidor
 */
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