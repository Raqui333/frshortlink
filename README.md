# frshortlink

A fast and lightweight URL shortener API built with **Fastify** and **Redis**.  
Designed for temporary link redirection with simple usage and high performance.

---

## Features

- Shorten URLs instantly
- Unique alphanumeric codes
- Redis as fast temporary storage
- Docker & Docker Compose support
- Typed with TypeScript
- Fastify for scalable APIs

---

## Requirements

Before running locally, make sure you have:

- **Node.js**
- **Redis** (or use Docker Compose)
- **npm** or **yarn**

---

## Run with Docker

To run API + Redis:

```bash
docker-compose up --build
```

Server will be available at:

> http://localhost:3000

---

## API Endpoints

### Create a short URL

**POST** `/`

#### Request body:

```json
{
  "url": "https://example.com"
}
```

#### Response:

```json
{
  "success": "Your short link was successfully created here is your code",
  "code": "8RsTbO",
  "expire_in_seconds": 30
}
```

### Redirect using shortcode

**GET** `/r/:code`

Redirects to original URL if found.  
Returns `404` if code does not exist or expired.

---

## Project Structure

```
src/
 ├─ routes/        # API routes
 ├─ services/  s   # Redis client
 └─ utils/         # Code generator and helpers
 ├─ server.ts      # Fastify instance
```

---

## Tech Stack

| Layer          | Technology |
| -------------- | ---------- |
| Runtime        | Node.js    |
| Framework      | Fastify    |
| Database/Cache | Redis      |
| Language       | TypeScript |
| Infrastructure | Docker     |

---

## License

MIT License © 2025 — Kleber Silva
