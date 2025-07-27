require('dotenv').config();
const express = require('express');
const wkhtmltopdf = require('wkhtmltopdf');

const app = express();

// ←–– add this at the very top, before any other middleware/routes:
app.use((req, res, next) => {
  console.log(`Connection received: ${req.method} ${req.url}`);
  next(); // pass control to the next middleware/route
});

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error('❌ Missing API_KEY in environment variables');
}


app.use((req, res, next) => {
  const sentKey = req.headers['x-api-key'];
  if (!sentKey || sentKey !== API_KEY) {
    // 401 Unauthorized if missing or wrong
    console.log(`Wrong key used`);
    return res.status(401).send('Unauthorized: invalid or missing API key');
  }
  next();
});

// Parse raw HTML bodies (text/html)
app.use(express.text({ type: 'text/html', limit: '10mb' }));
// Also accept JSON { html: "<h1>…</h1>" }
app.use(express.json({ type: 'application/json', limit: '10mb' }));

app.post('/generate-pdf', (req, res) => {
  // Determine where HTML came from
  const html = req.is('application/json') ? req.body.html : req.body;
  if (!html) {
    return res.status(400).send('Error: No HTML provided');
  }

  // Tell client we’re sending a PDF
  res.setHeader('Content-Type', 'application/pdf');

  // Spawn wkhtmltopdf, pipe output to response
  wkhtmltopdf(html, { pageSize: 'A4' })
    .on('error', err => {
      console.error('wkhtmltopdf failed:', err);
      // If the response isn’t already sent:
      if (!res.headersSent) res.status(500).send('PDF generation error');
    })
    .pipe(res);
});

const PORT = process.env.PORT;
if (!PORT) {
  throw new Error('❌ Missing PORT in environment variables');
}

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
