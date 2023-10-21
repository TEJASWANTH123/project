import express from 'express';
import cors from 'cors';
import { authRoutes, todoRoutes } from './routes/index';
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
import session from 'express-session';

// import multer, { Multer } from 'multer'; // Comment out or remove this line

const app = express();

app.use(cors());
app.use(express.json());

app.use(
    session({
      secret: 'your-secret-key', // Replace with a secure secret key
      resave: false,
      saveUninitialized: false,
    })
  );
app.use('/api', todoRoutes);
app.use('/auth', authRoutes);

// Set up the Swagger UI route using the updated Swagger JSON file
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
