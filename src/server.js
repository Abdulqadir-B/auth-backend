import express from 'express';
import { port } from './config/env.js';

const app = express();

app.use(express.json());

app.get('/health', (request, response) => {
  response.json({
    status: 'ok',
    message: 'Authentication API is running'
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
