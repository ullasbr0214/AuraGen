// index.js
require('dotenv').config();
const express = require('express');
const { generateComponent } = require('./generate-component');
const { validateComponent } = require('./validate-component');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.post('/generate', async (req, res) => {
  const { userPrompt, hesitation, clicks } = req.body;
  if (!userPrompt) {
    return res.status(400).json({ success: false, error: 'userPrompt is required' });
  }
  const result = await generateComponent(userPrompt, { hesitation, clicks });
  res.json(result);
});

app.post('/validate', async (req, res) => {
  const result = await validateComponent(req.body);
  res.json(result);
});

app.get('/', (req, res) => {
  res.send('AuraGen AI Pipeline is running ✅');
});

app.listen(PORT, () => {
  console.log(`🚀 AI Pipeline running at http://localhost:${PORT}`);
});