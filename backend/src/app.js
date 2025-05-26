import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

// Configura variáveis de ambiente PRIMEIRO
dotenv.config();

// Importações de rotas (ajustados os caminhos)
// import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import connectDB from './config/db.js';
import router from './routes/authRoutes.js';
import { schemas } from './docs/schemas.js';

// Conexão com MongoDB
connectDB();

const app = express();

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gerenciador Financeiro',
      version: '1.0.0',
      description: 'Documentação completa da API',
      contact: {
        name: "Sua Equipe",
        email: "suporte@financeiro.com"
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3001}`,
        description: "Servidor local"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: schemas
    },
  },
  apis: ['./src/routes/*.js'] // Caminho corrigido
};

const specs = swaggerJSDoc({ ...swaggerOptions, explorer: true });

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', router);  // Prefixo consistente
app.use('/api/tasks', taskRoutes);

// Documentação Swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// Rota de saúde
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'API operacional' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
  console.log(`📚 Documentação disponível em: http://localhost:${PORT}/api-docs`);
});