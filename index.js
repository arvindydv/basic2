const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data store
let items = [];

// CREATE - Add a new item
app.post('/items', (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    return res.status(400).json({ message: 'ID and name are required' });
  }
  
  const item = { id, name };
  items.push(item);
  res.status(201).json(item);
});

// READ - Get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// READ - Get a specific item by ID
app.get('/items/:id', (req, res) => {
  const { id } = req.params;
  const item = items.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.json(item);
});

// UPDATE - Update an item by ID
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const item = items.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  item.name = name || item.name;
  res.json(item);
});

// DELETE - Remove an item by ID
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(i => i.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }
  items.splice(index, 1);
  res.status(204).end();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
