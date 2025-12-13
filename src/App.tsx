import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import CoursesPage from './pages/CoursesPage';
import AboutPage from './pages/AboutPage';
import TeachersPage from './pages/TeachersPage';
import TeacherDetailsPage from './pages/TeacherDetailsPage';
import GoogleAuthCallback from './pages/GoogleAuthCallback';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);

  const navigate = (page: string, param?: string) => {
    console.log('navigate called:', { page, param });
    
    if (page === 'courses' && param) {
      setSelectedCategory(param);
    }
    
    if (page === 'teacher-details' && param) {
      setSelectedTeacherId(param);
    }

    setCurrentPage(page);
    // ensure the top of the new page is visible
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 20);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigate} />;
      case 'categories':
        return <CategoriesPage onNavigate={navigate} />;
      case 'courses':
        return <CoursesPage initialCategory={selectedCategory} />;
      case 'about':
        return <AboutPage />;
      case 'teachers':
        return <TeachersPage onNavigate={navigate} />;
      case 'teacher-details':
        return selectedTeacherId ? (
          <TeacherDetailsPage 
            teacherId={selectedTeacherId} 
            onBack={() => navigate('teachers')} 
          />
        ) : (
          <TeachersPage onNavigate={navigate} />
        );
      case 'auth-callback':
        return <GoogleAuthCallback />;
      case 'login':
        return <LoginPage onNavigate={navigate} />;
      case 'signup':
        return <SignupPage onNavigate={navigate} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      {renderPage()}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
