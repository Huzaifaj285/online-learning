import React, { useState, useEffect } from 'react';
import { courseAPI, enrollmentAPI } from '../services/api';
import './CourseList.css';

const CourseList = ({ onEnrollSuccess }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getAll();
      setCourses(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch courses: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    if (!selectedStudentId) {
      alert('Please enter a student ID');
      return;
    }

    try {
      await enrollmentAPI.enroll({
        studentId: selectedStudentId,
        courseId: courseId,
      });
      alert('Student enrolled successfully!');
      if (onEnrollSuccess) onEnrollSuccess();
      setSelectedStudentId('');
    } catch (err) {
      alert('Enrollment failed: ' + err.response?.data?.message || err.message);
    }
  };

  if (loading) return <div className="loading">Loading courses...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="course-list">
      <h2>Available Courses</h2>
      
      <div className="enroll-section">
        <input
          type="text"
          placeholder="Enter Student ID to enroll"
          value={selectedStudentId}
          onChange={(e) => setSelectedStudentId(e.target.value)}
          className="student-id-input"
        />
      </div>

      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course._id} className="course-card">
              <h3>{course.title}</h3>
              <p className="instructor">Instructor: {course.instructor}</p>
              <p className="description">{course.description}</p>
              <div className="course-details">
                <span className="category">{course.category}</span>
                <span className="duration">{course.duration}</span>
              </div>
              <div className="price-section">
                <span className="price">${course.price}</span>
                <span className="students">
                  {course.enrolledStudents?.length || 0} students enrolled
                </span>
              </div>
              <button
                onClick={() => handleEnroll(course._id)}
                className="enroll-btn"
              >
                Enroll
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
