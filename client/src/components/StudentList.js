import React, { useState, useEffect } from 'react';
import { studentAPI } from '../services/api';
import './StudentList.css';

const StudentList = ({ refreshTrigger }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newStudent, setNewStudent] = useState({ name: '', email: '' });
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, [refreshTrigger]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await studentAPI.getAll();
      setStudents(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch students: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.email) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await studentAPI.create(newStudent);
      alert('Student added successfully!');
      setNewStudent({ name: '', email: '' });
      setIsFormVisible(false);
      fetchStudents();
    } catch (err) {
      alert('Failed to add student: ' + err.response?.data?.message || err.message);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentAPI.delete(id);
        alert('Student deleted successfully!');
        fetchStudents();
      } catch (err) {
        alert('Failed to delete student: ' + err.message);
      }
    }
  };

  if (loading) return <div className="loading">Loading students...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="student-list">
      <div className="student-header">
        <h2>Students</h2>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="add-student-btn"
        >
          {isFormVisible ? 'Cancel' : '+ Add Student'}
        </button>
      </div>

      {isFormVisible && (
        <form onSubmit={handleAddStudent} className="add-student-form">
          <input
            type="text"
            placeholder="Student Name"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Student Email"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            required
          />
          <button type="submit" className="submit-btn">Add Student</button>
        </form>
      )}

      {students.length === 0 ? (
        <p className="no-data">No students found</p>
      ) : (
        <div className="students-table-container">
          <table className="students-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Enrolled Courses</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    {student.enrolledCourses?.length || 0}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteStudent(student._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentList;
