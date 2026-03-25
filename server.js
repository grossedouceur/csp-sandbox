'use strict';

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Store the current CSP value (empty means no CSP header)
let currentCsp = '';

app.use(express.json());
app.use(express.text({ type: 'text/plain' }));

// Apply the stored CSP header to non-API responses (static files / HTML pages)
app.use((req, res, next) => {
  if (currentCsp && !req.path.startsWith('/api/')) {
    res.setHeader('Content-Security-Policy', currentCsp);
  }
  next();
});

// PUT /api/csp – update the Content-Security-Policy
app.put('/api/csp', (req, res) => {
  const body = req.body;
  if (typeof body === 'string') {
    currentCsp = body.trim();
  } else if (body && typeof body.csp === 'string') {
    currentCsp = body.csp.trim();
  } else {
    return res.status(400).json({ error: 'Invalid body. Send a JSON object with a "csp" string field or a plain-text CSP value.' });
  }
  res.json({ csp: currentCsp });
});

// GET /api/csp – read the current CSP value (used by the frontend on load)
app.get('/api/csp', (_req, res) => {
  res.json({ csp: currentCsp });
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`CSP Sandbox running at http://localhost:${PORT}`);
});
