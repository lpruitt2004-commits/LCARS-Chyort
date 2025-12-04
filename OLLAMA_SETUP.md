# Ollama AI Integration for LCARS-Chyort

## Recommended Models for Raspberry Pi 5 (8GB RAM)

### Chat Model: Llama 3.2 (3B parameters)
- **Size**: ~2.0GB
- **RAM Usage**: ~4GB
- **Speed**: Excellent on Pi 5
- **Purpose**: General chat, encyclopedia questions, tutoring
- **Quality**: State-of-the-art for size

### Code Model: CodeLlama 7B (Quantized)
- **Size**: ~3.8GB
- **RAM Usage**: ~5-6GB
- **Speed**: Good on Pi 5
- **Purpose**: Code generation, debugging, explanations
- **Quality**: Best code model for local use

**Alternative**: CodeLlama 13B is too large, but 7B is perfect for Pi 5

**Total Storage**: ~6GB for both models
**Peak RAM**: ~6GB (run one at a time to stay safe)

### Backup Options (if you want both loaded):
- **Chat**: Llama 3.2 1B (~700MB, still very capable)
- **Code**: CodeLlama 7B (keep this one, it's excellent)

## Installation Steps

### 1. Install Ollama on Raspberry Pi 5

```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Pull chat model (Llama 3.2 3B)
ollama pull llama3.2:3b

# Pull code model (CodeLlama 7B)
ollama pull codellama:7b

# Verify installation
ollama list
```

### 2. Test Models

```bash
# Test chat model
ollama run llama3.2:3b "Hello, I'm Chyort!"

# Test code model
ollama run codellama:7b "Explain what a function is in Python"
```

### 3. Run Ollama as a Service

```bash
# Ollama runs automatically as a service on port 11434
# Check status
systemctl status ollama

# Or start manually
ollama serve
```

## Backend Integration

Create a Node.js backend to connect React app to Ollama:

### Install Dependencies

```bash
# In your project directory
npm install express cors ollama
```

### Backend Server (server.js)

See `server.js` file for implementation.

### Update React App

See updated `ChatWindow.jsx` for API integration.

## Running the Full Stack

### Terminal 1: Start Ollama
```bash
ollama serve
```

### Terminal 2: Start Backend
```bash
node server.js
```

### Terminal 3: Start React App
```bash
npm run dev
```

## Memory Management

- **Run one model at a time** to stay under 8GB RAM
- **Pi 5 can handle both models**, just swap between them
- **Models load in ~2-5 seconds** on first use
- **Responses take 1-3 seconds** depending on query

## Alternative Smaller Models (if needed)

If you need to run both simultaneously or want faster responses:
- **Chat**: Llama 3.2 1B (~700MB, very capable)
- **Code**: Keep CodeLlama 7B (worth the size)

Or for maximum speed:
- **tinyllama:1.1b** (~637MB, basic but fast)
- **qwen2.5-coder:1.5b** (~900MB, decent code model)

## Performance Tips

1. **CodeLlama 7B is excellent** - best code model that fits your Pi
2. **Llama 3.2 3B** provides great chat quality
3. Switch models via chat UI (we'll add a toggle)
4. First query loads model (~3-5 sec), then stays in memory
5. Responses: 1-3 seconds for chat, 2-5 seconds for code
6. Consider using **Llama 3.2 1B** if you want both loaded at once

## Troubleshooting

- **Out of Memory**: Use smaller models or run one at a time
- **Slow Responses**: Normal on first load, caches afterward
- **Connection Issues**: Check Ollama service is running on port 11434
