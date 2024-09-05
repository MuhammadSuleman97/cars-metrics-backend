import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { clearDirectory } from './helpers/fileUtils.js';
import router from './routes/index.js';
import cors from 'cors';

const app = express();
app.use(express.json());

// Determine the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the uploads directory path
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Clear the uploads folder at startup to remove any files that were left over from previous runs
clearDirectory(UPLOADS_DIR);

// Use CORS middleware
app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
}));

// Serve static files from the Angular browser directory
app.use(express.static(path.join(__dirname, 'dist', 'cars-metrics', 'browser')));

// API routes
app.use('/api', router);

// Redirect all other routes to Angular's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'cars-metrics', 'browser', 'index.html'));
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).send('404 - Not Found');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
