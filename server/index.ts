import express from 'express';
import path from 'path';
import cors from 'cors';
import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages } from 'ai';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  console.log('POST /api/chat', { messages });
  try {
    const modelMessages = await convertToModelMessages(messages);
    const result = streamText({
      model: openai('gpt-4o'),
      messages: modelMessages,
    });
    result.pipeTextStreamToResponse(res);
  } catch (err) {
    console.error('Erro ao chamar OpenAI:', err);
    res.status(500).json({ error: 'Erro ao chamar OpenAI', details: String(err) });
  }
});

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'dist')));

app.use(cors({
  origin: 'http://localhost:5173' 
}));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(3000, () => console.log('Servidor em http://localhost:3000'));