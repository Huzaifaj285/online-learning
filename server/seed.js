const mongoose = require('mongoose');
require('dotenv').config();

const Student = require('./models/Student');
const Course = require('./models/Course');
const Enrollment = require('./models/Enrollment');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/online-learning';

const seedDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Student.deleteMany({});
    await Course.deleteMany({});
    await Enrollment.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create sample students
    const students = await Student.create([
      { name: 'Alice Johnson', email: 'alice@example.com' },
      { name: 'Bob Smith', email: 'bob@example.com' },
      { name: 'Carol White', email: 'carol@example.com' },
      { name: 'David Brown', email: 'david@example.com' },
      { name: 'Emma Davis', email: 'emma@example.com' },
    ]);
    console.log('👥 Created 5 sample students');

    // Create sample courses
    const courses = await Course.create([
      {
        title: 'Web Development Fundamentals',
        description: 'Learn HTML, CSS, and JavaScript basics',
        instructor: 'Sarah Wilson',
        price: 49.99,
        duration: '8 weeks',
        category: 'Web Development',
      },
      {
        title: 'Advanced React.js',
        description: 'Master React hooks, context, and state management',
        instructor: 'John Mitchell',
        price: 79.99,
        duration: '6 weeks',
        category: 'Frontend',
      },
      {
        title: 'MongoDB Mastery',
        description: 'Complete guide to MongoDB and Mongoose',
        instructor: 'Lisa Chen',
        price: 59.99,
        duration: '5 weeks',
        category: 'Database',
      },
      {
        title: 'Node.js Backend Development',
        description: 'Build scalable backend applications with Node.js',
        instructor: 'Mike Johnson',
        price: 69.99,
        duration: '7 weeks',
        category: 'Backend',
      },
      {
        title: 'Full Stack MERN Stack',
        description: 'Build complete applications with MongoDB, Express, React, and Node.js',
        instructor: 'Emma Rodriguez',
        price: 99.99,
        duration: '10 weeks',
        category: 'Full Stack',
      },
    ]);
    console.log('📚 Created 5 sample courses');

    // Create sample enrollments
    const enrollments = await Enrollment.create([
      { student: students[0]._id, course: courses[0]._id, progress: 45 },
      { student: students[0]._id, course: courses[1]._id, progress: 20 },
      { student: students[1]._id, course: courses[0]._id, progress: 75 },
      { student: students[1]._id, course: courses[2]._id, progress: 30 },
      { student: students[2]._id, course: courses[1]._id, progress: 60 },
      { student: students[2]._id, course: courses[3]._id, progress: 15 },
      { student: students[3]._id, course: courses[2]._id, progress: 90 },
      { student: students[4]._id, course: courses[4]._id, progress: 50 },
    ]);
    console.log('📝 Created 8 sample enrollments');

    // Update students with enrollments
    for (const enrollment of enrollments) {
      await Student.findByIdAndUpdate(
        enrollment.student,
        { $push: { enrolledCourses: enrollment.course } }
      );
      await Course.findByIdAndUpdate(
        enrollment.course,
        { $push: { enrolledStudents: enrollment.student } }
      );
    }
    console.log('✅ Updated relationships between students and courses');

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\nSample Data Created:');
    console.log(`- ${students.length} Students`);
    console.log(`- ${courses.length} Courses`);
    console.log(`- ${enrollments.length} Enrollments`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
