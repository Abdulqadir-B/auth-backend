import express from 'express';
import { port } from './config/env.js';
import { connectDatabase } from './config/database.js';

const app = express();

app.use(express.json());

app.get('/health', (request, response) => {
  response.json({
    status: 'ok',
    message: 'Authentication API is running'
  });
});

const startServer = async () => {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

startServer();
