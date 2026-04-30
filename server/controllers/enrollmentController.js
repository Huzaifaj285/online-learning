const Enrollment = require('../models/Enrollment');
const Student = require('../models/Student');
const Course = require('../models/Course');

// Get all enrollments
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().populate('student').populate('course');
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get enrollment by ID
exports.getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id).populate('student').populate('course');
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Enroll student in course
exports.enrollStudent = async (req, res) => {
  const { studentId, courseId } = req.body;

  if (!studentId || !courseId) {
    return res.status(400).json({ message: 'Student ID and Course ID are required' });
  }

  try {
    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId
    });

    if (existingEnrollment) {
      return res.status(400).json({ message: 'Student is already enrolled in this course' });
    }

    // Create enrollment
    const enrollment = new Enrollment({ student: studentId, course: courseId });
    const savedEnrollment = await enrollment.save();

    // Add course to student's enrolledCourses
    student.enrolledCourses.push(courseId);
    await student.save();

    // Add student to course's enrolledStudents
    course.enrolledStudents.push(studentId);
    await course.save();

    const populatedEnrollment = await Enrollment.findById(savedEnrollment._id)
      .populate('student')
      .populate('course');

    res.status(201).json(populatedEnrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update enrollment
exports.updateEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('student').populate('course');

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete enrollment (unenroll student)
exports.deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    // Remove course from student's enrolledCourses
    await Student.findByIdAndUpdate(
      enrollment.student,
      { $pull: { enrolledCourses: enrollment.course } }
    );

    // Remove student from course's enrolledStudents
    await Course.findByIdAndUpdate(
      enrollment.course,
      { $pull: { enrolledStudents: enrollment.student } }
    );

    res.status(200).json({ message: 'Enrollment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
