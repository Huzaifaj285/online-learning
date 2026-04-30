# Copilot Instructions - MERN Online Learning Platform

This is a full-stack online learning platform built with MongoDB, Express, React, and Node.js.

## Project Overview
- **Backend**: Express.js REST API with Node.js (runs on port 5000)
- **Frontend**: React with modern UI components (runs on port 3000)
- **Database**: MongoDB for students, courses, and enrollments
- **Features**: Student management, course catalog, enrollment system with progress tracking

## Project Structure
```
online-learning-platform/
├── server/           # Backend (Express + Node.js + MongoDB)
├── client/           # Frontend (React)
└── .vscode/tasks.json # VS Code tasks for development
```

## Quick Start Guide

### 1. Install Dependencies
```bash
npm run install-all
```

### 2. Configure MongoDB
Edit `server/.env` and set your MongoDB connection:
```
MONGODB_URI=mongodb://localhost:27017/online-learning
PORT=5000
```

### 3. Seed Database (Optional)
To populate sample data:
```bash
cd server && npm run seed
```

### 4. Start Development Servers
Option A - Run both servers together:
```bash
npm run dev
```

Option B - Run servers separately:
```bash
npm run server    # Terminal 1 - Backend (port 5000)
npm run client    # Terminal 2 - Frontend (port 3000)
```

### 5. Access Application
- Frontend: http://localhost:3000
- API: http://localhost:5000/api

## API Endpoints
- Students: `/api/students`
- Courses: `/api/courses`
- Enrollments: `/api/enrollments`

## Available VS Code Tasks
Press Ctrl+Shift+B to run tasks:
- Start Backend Server
- Start Frontend Server
- Start Both Servers (Default)
- Seed Database
- Install All Dependencies

## Key Features
✅ Create and manage students
✅ Create and manage courses
✅ Enroll students in courses
✅ Track student progress
✅ Full CRUD operations
✅ RESTful API
✅ Responsive React UI
✅ MongoDB relationships

## Troubleshooting
- **MongoDB Connection Error**: Ensure MongoDB is running or update MONGODB_URI in .env
- **Port Already in Use**: Change PORT in .env file
- **CORS Issues**: Backend must be running when frontend makes API calls
- **Dependencies Issues**: Run `npm run install-all` again
