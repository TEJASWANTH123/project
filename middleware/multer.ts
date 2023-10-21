import multer from 'multer';
import express from 'express';

// Create a Multer instance and specify the storage destination
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set the directory where files will be stored
    },
    filename: (req, file, cb) => {
        // Generate a unique filename for the uploaded file
        const timestamp = Date.now();
        cb(null, `${timestamp}-${file.originalname}`);
    },
});

// Create the Multer middleware with the specified storage options
const upload = multer({ storage });

// Define a route handler for file uploads
const uploadRoute = express.Router();

uploadRoute.post('/upload', upload.single('file'), (req, res) => {
    // Access the uploaded file through req.file
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const { filename } = req.file;
    res.status(200).json({ message: 'File uploaded successfully', filename });
});

export default uploadRoute;
