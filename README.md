

````markdown
# HTML-to-PDF Microservice

A simple Node.js + Express-based API server that converts raw HTML into downloadable PDF files using `wkhtmltopdf`.
````
---

## Features

- Accepts raw HTML or `{ html: "<h1>Hello</h1>" }` via POST
- Streams back a generated PDF (`application/pdf`)
- Basic API key authentication (`x-api-key` header)
- Lightweight and deployable as a microservice

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- `wkhtmltopdf` installed on your system (must be in `$PATH`)
- `.env` file with the following:

```env
PORT=3000
API_KEY=your-api-key-here
````

### Installation

```bash
git clone https://github.com/Galaxyraider20/HTML-to-PDF.git
cd HTML-to-PDF
npm install
```

---

## Running the Server

```bash
node index.js
```

Server will run at:
`http://localhost:3000`

---

## API Usage

### `POST /generate-pdf`

#### Headers:

```
Content-Type: application/json
x-api-key: your-api-key
```

#### JSON Body:

```json
{
  "html": "<h1>Hello, PDF!</h1>"
}
```

#### Or send raw HTML:

Set `Content-Type: text/html` and send:

```html
<h1>Hello PDF!</h1>
```
#### Sample Request 
```html
<pre> POST /generate-pdf HTTP/1.1 Host: localhost:3000 Content-Type: application/json x-api-key: your-api-key </pre>

{
  "html": "<h1>Hello, PDF!</h1><p>This is a test paragraph rendered into PDF.</p>"
}
```
#### Response:
```html
 <pre> HTTP/1.1 200 OK Content-Type: application/pdf Content-Disposition: inline </pre> 
 ```
---



## Security

* Requires valid `x-api-key` header matching the value in your `.env`
* Returns `401 Unauthorized` if missing or invalid

---

## Project Structure

```
.
├── index.js              # Main server code
├── package.json          # Node project metadata
├── .env.example          # Environment variable template
├── .gitignore            # Ignore list
├── LICENSE               # MIT License
```

---

## License

MIT License. See `LICENSE` file for details.

---

## Author

**Galaxyraider20**
[GitHub Profile](https://github.com/Galaxyraider20)

---
