import React from 'react';
import './Navigation.css';

const Navigation = ({ currentPage, onNavigate }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">📚 Online Learning Platform</h1>
        <ul className="nav-menu">
          <li className="nav-item">
            <button
              className={`nav-link ${currentPage === 'courses' ? 'active' : ''}`}
              onClick={() => onNavigate('courses')}
            >
              Courses
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${currentPage === 'students' ? 'active' : ''}`}
              onClick={() => onNavigate('students')}
            >
              Students
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${currentPage === 'enrollments' ? 'active' : ''}`}
              onClick={() => onNavigate('enrollments')}
            >
              Enrollments
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
