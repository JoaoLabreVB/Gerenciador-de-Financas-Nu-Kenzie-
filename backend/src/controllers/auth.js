import jwt from 'jsonwebtoken';
import express from 'express';


const secret = process.env.JWT_SECRET || 'segredo_dev';
const router = express.Router();
const userIdMaster = '4ce3c2b3-45a2-4d10-a634-ca3baa9852da'
const userNameMaster = 'Jabra'
router.post('/login',
  async (req, res) => {
    try {
      const { email, password } = req.body;
      // const user = users.find(u => u.email === email && u.password === password);

      // if (!user) {
        // return res.status(401).json({ error: 'Credenciais inválidas' });
      // }

      const token = jwt.sign({ id: userIdMaster }, secret, { expiresIn: '1h' });
      res.json({ user: { id: userIdMaster, name: userNameMaster }, token });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro no servidor'
      });
    }
  }
)

export default router;

