import express from 'express';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.get('/', verifyToken, (req, res) => {
  // Lógica para buscar perfis do usuário
});

export default router;