# CSP Sandbox

An interactive web application for experimenting with [Content-Security-Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) headers.

## Goal

CSP is a browser security mechanism that lets a server declare which resource origins are allowed to load on a page. Debugging CSP rules can be tricky because the feedback loop is slow — you change the header on the server, reload the browser, and hunt through the console for errors.

**CSP Sandbox** tightens that loop: type a CSP string into the control panel, click **Set CSP**, and the page reloads automatically with the new policy applied. The page displays a set of test resources (images and scripts from different origins) with a live ✅/❌ status for each, so you can immediately see which resources are allowed or blocked by the current policy.

## Features

| Section | Resources tested |
|---------|-----------------|
| **Images** | Data URI (inline), same-origin (`/image.png`), external (picsum.photos) |
| **JavaScript** | Inline `<script>`, same-origin (`/local-script.js`), external CDN (cdnjs/lodash) |

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or newer

## Getting Started

```bash
# Install dependencies
npm install

# Start the server
npm start
```

Open <http://localhost:3000> in your browser.

## Usage

1. **Set a CSP** — type a CSP directive string into the textarea and click **Set CSP**.  
   The page reloads automatically and the new `Content-Security-Policy` header is applied to every static-file response.  
   _Example — allow only same-origin resources:_
   ```
   default-src 'self'
   ```

2. **Observe the results** — each resource card updates to show whether the resource loaded (✅) or was blocked (❌).  
   Open the browser DevTools console to read the detailed CSP violation messages.

3. **Iterate** — adjust the CSP string and click **Set CSP** again.

4. **Clear the CSP** — click **Clear CSP** to remove the header entirely, restoring the default permissive behavior.

### Useful CSP examples to try

| Goal | Directive |
|------|-----------|
| Block everything | `default-src 'none'` |
| Allow only same-origin | `default-src 'self'` |
| Allow inline scripts | `default-src 'self'; script-src 'self' 'unsafe-inline'` |
| Allow data URIs for images | `default-src 'self'; img-src 'self' data:` |
| Allow a specific external CDN | `default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com` |

## Project Structure

```
csp-sandbox/
├── server.js          # Express server — serves static files and exposes PUT /api/csp
├── package.json
└── public/
    ├── index.html     # Single-page application
    ├── image.png      # Same-origin test image
    └── local-script.js  # Same-origin test script
```

## API

| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/api/csp` | Returns the currently active CSP string |
| `PUT`  | `/api/csp` | Sets the CSP; body: `{ "csp": "<directive>" }` |

The CSP is stored in memory and reset when the server restarts.
