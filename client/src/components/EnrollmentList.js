import React, { useState, useEffect } from 'react';
import { enrollmentAPI } from '../services/api';
import './EnrollmentList.css';

const EnrollmentList = ({ refreshTrigger }) => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEnrollments();
  }, [refreshTrigger]);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const response = await enrollmentAPI.getAll();
      setEnrollments(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch enrollments: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnenroll = async (enrollmentId) => {
    if (window.confirm('Are you sure you want to unenroll this student?')) {
      try {
        await enrollmentAPI.unenroll(enrollmentId);
        alert('Student unenrolled successfully!');
        fetchEnrollments();
      } catch (err) {
        alert('Failed to unenroll: ' + err.message);
      }
    }
  };

  const handleUpdateProgress = async (enrollmentId, currentProgress) => {
    const newProgress = prompt('Enter progress percentage (0-100):', currentProgress);
    if (newProgress !== null) {
      const progress = parseInt(newProgress);
      if (progress < 0 || progress > 100 || isNaN(progress)) {
        alert('Please enter a valid number between 0 and 100');
        return;
      }

      try {
        await enrollmentAPI.update(enrollmentId, { progress });
        alert('Progress updated successfully!');
        fetchEnrollments();
      } catch (err) {
        alert('Failed to update progress: ' + err.message);
      }
    }
  };

  if (loading) return <div className="loading">Loading enrollments...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="enrollment-list">
      <h2>Enrollments</h2>

      {enrollments.length === 0 ? (
        <p className="no-data">No enrollments found</p>
      ) : (
        <div className="enrollments-table-container">
          <table className="enrollments-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Course Title</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Enrolled Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enrollment) => (
                <tr key={enrollment._id}>
                  <td>{enrollment.student?.name || 'N/A'}</td>
                  <td>{enrollment.course?.title || 'N/A'}</td>
                  <td>
                    <span className={`status-badge ${enrollment.status}`}>
                      {enrollment.status}
                    </span>
                  </td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${enrollment.progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{enrollment.progress}%</span>
                    </div>
                  </td>
                  <td>{new Date(enrollment.enrolledAt).toLocaleDateString()}</td>
                  <td className="action-buttons">
                    <button
                      onClick={() => handleUpdateProgress(enrollment._id, enrollment.progress)}
                      className="update-btn"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleUnenroll(enrollment._id)}
                      className="unenroll-btn"
                    >
                      Unenroll
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

export default EnrollmentList;
