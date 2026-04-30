import React, { useState } from 'react';
import Navigation from './components/Navigation';
import CourseList from './components/CourseList';
import StudentList from './components/StudentList';
import EnrollmentList from './components/EnrollmentList';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('courses');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleEnrollSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'courses':
        return <CourseList onEnrollSuccess={handleEnrollSuccess} />;
      case 'students':
        return <StudentList refreshTrigger={refreshTrigger} />;
      case 'enrollments':
        return <EnrollmentList refreshTrigger={refreshTrigger} />;
      default:
        return <CourseList onEnrollSuccess={handleEnrollSuccess} />;
    }
  };

  return (
    <div className="App">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
