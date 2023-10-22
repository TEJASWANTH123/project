const express = require('express');
const cors = require('cors');
const { authRoutes, todoRoutes } = require('./routes/index');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const session = require('express-session');
const multer = require('multer');
const path = require('path'); // To work with file paths


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

const storage: multer.StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, 'uploads/'); // The 'uploads' folder is the destination for file uploads
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});



const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  // res.json({ message: 'File uploaded successfully' });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
