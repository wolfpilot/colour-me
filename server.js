// Helpers
const path = require('path');

// Build
const express = require('express');

// Server
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(__dirname));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './src/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));

