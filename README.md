# MERN Online Learning Platform

A full-stack online learning platform built with MongoDB, Express, React, and Node.js that manages students, courses, and enrollments with a RESTful API.

## 🎯 Features

- **Student Management**: Create, read, update, and delete student records
- **Course Catalog**: Browse and manage available courses with detailed information
- **Enrollment System**: Students can enroll in multiple courses
- **Progress Tracking**: Monitor student progress in enrolled courses
- **RESTful API**: Complete REST API for all operations
- **Responsive UI**: Modern, user-friendly React interface
- **MongoDB Integration**: Persistent data storage with MongoDB

## 🏗️ Project Structure

```
online-learning-platform/
├── server/                 # Express backend
│   ├── models/            # MongoDB schemas
│   │   ├── Student.js
│   │   ├── Course.js
│   │   └── Enrollment.js
│   ├── controllers/       # Business logic
│   │   ├── studentController.js
│   │   ├── courseController.js
│   │   └── enrollmentController.js
│   ├── routes/           # API routes
│   │   ├── studentRoutes.js
│   │   ├── courseRoutes.js
│   │   └── enrollmentRoutes.js
│   ├── server.js         # Express server setup
│   ├── .env              # Environment variables
│   └── package.json
│
├── client/               # React frontend
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # React components
│   │   │   ├── Navigation.js
│   │   │   ├── CourseList.js
│   │   │   ├── StudentList.js
│   │   │   └── EnrollmentList.js
│   │   ├── services/    # API service
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── package.json          # Root package file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn

### Installation

1. **Clone or navigate to project directory**
```bash
cd online-learning-platform
```

2. **Install dependencies for all packages**
```bash
npm run install-all
```

Or manually:
```bash
npm install
cd server && npm install
cd ../client && npm install
```

3. **Configure MongoDB Connection**
Edit `server/.env`:
```
MONGODB_URI=mongodb://localhost:27017/online-learning
PORT=5000
NODE_ENV=development
```

For MongoDB Atlas (cloud):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/online-learning
```

### Running the Application

**Development Mode (runs both frontend and backend)**
```bash
npm run dev
```

**Or run separately:**

Start the backend server:
```bash
npm run server
```

In another terminal, start the frontend:
```bash
npm run client
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

## 📚 API Endpoints

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Enrollments
- `GET /api/enrollments` - Get all enrollments
- `GET /api/enrollments/:id` - Get enrollment by ID
- `POST /api/enrollments` - Enroll student in course
- `PUT /api/enrollments/:id` - Update enrollment (progress, status)
- `DELETE /api/enrollments/:id` - Unenroll student

## 📝 Sample Data

You can use the following examples to test the API:

### Create a Student
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
  }'
```

### Create a Course
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Web Development 101",
    "description": "Learn web development from scratch",
    "instructor": "Jane Smith",
    "price": 49.99,
    "duration": "8 weeks",
    "category": "Web Development"
  }'
```

### Enroll Student in Course
```bash
curl -X POST http://localhost:5000/api/enrollments \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "STUDENT_ID_HERE",
    "courseId": "COURSE_ID_HERE"
  }'
```

## 🏪 React UI Features

### Courses Page
- View all available courses
- Filter by category
- Enroll students by entering their ID
- See enrollment count per course

### Students Page
- View all registered students
- Add new students
- View enrolled courses count
- Delete student records

### Enrollments Page
- View all active enrollments
- Track progress (0-100%)
- Update student progress
- Change enrollment status
- Unenroll students

## 🛠️ Technologies Used

### Backend
- **Express.js** - Web framework
- **Node.js** - JavaScript runtime
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment configuration

### Frontend
- **React** - UI library
- **Axios** - HTTP client
- **CSS3** - Styling

## 🔍 Database Schema

### Student Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  enrolledCourses: [ObjectId], // References to Course
  createdAt: Date
}
```

### Course Schema
```javascript
{
  title: String (required),
  description: String (required),
  instructor: String (required),
  price: Number (required),
  duration: String (required),
  category: String (required),
  enrolledStudents: [ObjectId], // References to Student
  createdAt: Date
}
```

### Enrollment Schema
```javascript
{
  student: ObjectId (required), // Reference to Student
  course: ObjectId (required),  // Reference to Course
  status: String (active|completed|dropped),
  progress: Number (0-100),
  enrolledAt: Date
}
```

## 📱 Development Workflow

1. **Backend Development**
   - Models define data structure
   - Controllers handle business logic
   - Routes define API endpoints
   - Middleware handles CORS and parsing

2. **Frontend Development**
   - Components handle UI rendering
   - Services manage API communication
   - State management tracks data
   - CSS provides styling

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in `.env`
- Verify network connectivity for cloud databases

### Port Already in Use
- Change PORT in `.env` or use: `PORT=5001 npm run server`
- For frontend: `PORT=3001 npm run client`

### CORS Issues
- Verify backend is running on correct port
- Check proxy setting in client `package.json`
- Ensure API URLs match in frontend

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork, modify, and improve this project!
