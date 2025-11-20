# Devscholar Backend API

Complete Node.js + PostgreSQL backend for video course platform with video storage, descriptions, and course management.

## Features

- ✅ Video management (CRUD operations)
- ✅ Course management with categories
- ✅ PostgreSQL database with Sequelize ORM
- ✅ TypeScript for type safety
- ✅ Express.js REST API
- ✅ CORS support for frontend
- ✅ Environment configuration
- ✅ Request logging with Morgan
- ✅ Security with Helmet
- ✅ Pagination support

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Security:** Helmet, CORS
- **Logging:** Morgan
- **Code Quality:** ESLint, Prettier

## Prerequisites

- Node.js >= 16
- PostgreSQL >= 12
- npm or yarn

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your PostgreSQL credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=devscholar
   PORT=5000
   ```

3. **Create PostgreSQL database:**
   ```bash
   createdb devscholar
   ```

## Running the Server

**Development:**
```bash
npm run dev
```

**Build:**
```bash
npm run build
```

**Production:**
```bash
npm start
```

## API Endpoints

### Courses

- `GET /api/courses` - Get all courses (with pagination)
- `GET /api/courses/:id` - Get course by ID
- `GET /api/courses/category/:category` - Get courses by category
- `POST /api/courses` - Create a course
- `PUT /api/courses/:id` - Update a course
- `DELETE /api/courses/:id` - Delete a course

### Videos

- `GET /api/videos/course/:courseId` - Get videos for a course
- `GET /api/videos/:id` - Get video by ID (increments views)
- `POST /api/videos` - Create a video
- `PUT /api/videos/:id` - Update a video
- `DELETE /api/videos/:id` - Delete a video

## Database Models

### User
- id, email, password, firstName, lastName, role, bio, avatar, isActive

### Course
- id, title, description, thumbnail, category, instructorId, price, originalPrice, duration, level, isPublished

### Video
- id, courseId, title, description, videoUrl, thumbnail, duration, order, isPublished, views

## Example Requests

**Create a Course:**
```bash
POST /api/courses
Content-Type: application/json

{
  "title": "Web 3 Basics",
  "description": "Learn blockchain and web3",
  "thumbnail": "https://...",
  "category": "Web 3",
  "instructorId": 1,
  "price": 0,
  "originalPrice": 99,
  "duration": "10 hours",
  "level": "Beginner"
}
```

**Create a Video:**
```bash
POST /api/videos
Content-Type: application/json

{
  "courseId": 1,
  "title": "Intro to Blockchain",
  "description": "Understanding blockchain basics",
  "videoUrl": "https://drive.google.com/uc?id=...",
  "duration": 300,
  "order": 1
}
```

## License

MIT
