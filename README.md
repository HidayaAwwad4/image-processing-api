# Image Processing API

This project is part of the **Udacity Full Stack JavaScript Nanodegree**.  
It provides an API for resizing images using **Sharp**. Users can request a resized version of an image by specifying the filename, width, and height through query parameters.  

---

## Features
- Resize images dynamically through API requests.
- Cache processed images for faster subsequent requests.
- Error handling for invalid input (missing parameters, invalid dimensions, non-existent files).

---

## Technologies Used
- **Node.js**
- **Express**
- **TypeScript**
- **Sharp**

---
## Error Handling
- **The API handles common failure scenarios and responds with appropriate HTTP status codes:**

- 400 Bad Request: Missing filename, width, or height parameters, or invalid width/height (non-numbers, negative, or zero).

- 404 Not Found: Requested image does not exist in the full-size directory.

- 500 Internal Server Error: Image processing failed for any other reason.

---
### Example Error Responses

Missing parameters:
```json
{
  "error": "Missing query params: filename, width, height are required."
}
```
---

## Scripts

### Build the project
```bash
npm run build
```
---
### Start the server
```bash
npm run start
```
---
### Run in development mode
```bash
npm run dev
```
---
### Run tests
```bash
npm run test
```
---
### Lint code
```bash
npm run lint
```
---
### Format code
```bash
npm run prettier
```
---

### Usage

After starting the server, open your browser or use a tool like Postman to send requests to the endpoint:

GET http://localhost:3000/api/images?filename=<image_name>&width=<width>&height=<height>

### Endpoint
```bash
http://localhost:3000/api/images?filename=fjord&width=200&height=200
```
---
