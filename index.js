import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { clearDirectory } from './helpers/fileUtils.js';
import router from './routes/index.js';

const app = express();
app.use(express.json());

// Determine the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the uploads directory path
const UPLOADS_DIR = path.join(__dirname, 'uploads'); 

// Clear the uploads folder at startup to remove any files that were left over from previous runs
clearDirectory(UPLOADS_DIR);

// allow CORS requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', router);

// not found
app.use((req, res, next) => {
  res.status(404).send('404 - Not Found');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});