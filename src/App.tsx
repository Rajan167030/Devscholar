import { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import CoursesPage from './pages/CoursesPage';
import AboutPage from './pages/AboutPage';
import TeachersPage from './pages/TeachersPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const navigate = (page: string, category?: string) => {
    console.log('navigate called:', { page, category });
    if (page === 'courses' && category) {
      setSelectedCategory(category);
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
        return <CategoriesPage />;
      case 'courses':
        return <CoursesPage initialCategory={selectedCategory} />;
      case 'about':
        return <AboutPage />;
      case 'teachers':
        return <TeachersPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      {renderPage()}
    </div>
  );
}

export default App;
