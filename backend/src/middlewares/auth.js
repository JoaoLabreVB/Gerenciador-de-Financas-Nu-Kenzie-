import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'segredo_dev';

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    req.userId = decoded.id;
    next();
  });
};