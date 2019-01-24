// Helpers
const path = require('path');

// Build
const express = require('express');

// Server
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: './dist' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

