const express = require('express');
const cors = require('cors');
const { Ollama } = require('ollama');

const app = express();
const ollama = new Ollama({ host: 'http://localhost:11434' });

app.use(cors());
app.use(express.json());

// Chat endpoint (uses llama3.2:3b)
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    const response = await ollama.chat({
      model: 'llama3.2:3b',
      messages: [
        {
          role: 'system',
          content: 'You are Chyort, a helpful AI assistant living in a Raspberry Pi. You help users learn from an encyclopedia covering topics like biology, chemistry, physics, and more. Be friendly, concise, and educational.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      stream: false
    });

    res.json({ response: response.message.content });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to get response from Chyort' });
  }
});

// Code endpoint (uses codellama:7b)
app.post('/api/code', async (req, res) => {
  try {
    const { message } = req.body;
    
    const response = await ollama.chat({
      model: 'codellama:7b',
      messages: [
        {
          role: 'system',
          content: 'You are Chyort\'s code assistant. Help users understand programming concepts, debug code, and learn to code. Be clear and provide examples.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      stream: false
    });

    res.json({ response: response.message.content });
  } catch (error) {
    console.error('Code error:', error);
    res.status(500).json({ error: 'Failed to get code assistance' });
  }
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const models = await ollama.list();
    res.json({ 
      status: 'ok', 
      models: models.models.map(m => m.name) 
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Chyort backend running on http://localhost:${PORT}`);
  console.log('Make sure Ollama is running: ollama serve');
});
