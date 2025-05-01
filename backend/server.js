import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/save-payload', (req, res) => {
  console.log("entered")
  let { filePath, data } = req.body;
  console.log("data ", data)
  console.log("data ", JSON.parse(data))
  console.log("data ", JSON.stringify(data))
  console.log("hsdcs")

  if (!filePath || !data) {
    return res.status(400).json({ error: 'Missing filePath or data' });
  }
  filePath = `..${filePath}`
  console.log("filePath is ", filePath)
  const fullPath = path.resolve(__dirname, filePath);

  try {
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });

    fs.writeFileSync(fullPath, JSON.stringify(JSON.parse(data), null, 2));

    res.json({ success: true, path: fullPath });
  } catch (err) {
    console.error('Write failed:', err);
    res.status(500).json({ error: 'Failed to write file' });
  }
});

app.get('/get-env-details', (req, res) => {
  try{
const { filePath } = req.query;
console.log("filePath is ", filePath)

  const envFilePath = path.resolve(__dirname, filePath); // adjust path if needed
  console.log("envFilePath is ", envFilePath)
    const envContent = fs.readFileSync(envFilePath, 'utf-8');
    
    
    const envKeys = envContent
      .split('\n')                        // Split by lines
      .map(line => line.trim())          // Trim whitespace
      .filter(line => line && !line.startsWith('#'))  // Remove empty and comment lines
      .map(line => line.split('=')[0])   // Get key part before =
      .map(key => `process.env["${key}"]`); // Format as process.env["KEY"]
    
    console.log(envKeys);
    res.json({ success: true, envKeys });
  //return envKeys;
  } catch (e){
    console.log("error is ", e)
    res.status(500).json({ error: 'Failed to read file' });
  }
  
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
