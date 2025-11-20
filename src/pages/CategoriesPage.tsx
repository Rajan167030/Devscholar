import CategoryCard from '../components/CategoryCard';
import StatsSection from '../components/StatsSection';
import { categories } from '../data/coursesData';

interface CategoriesPageProps {
  onNavigate?: (page: string, category?: string) => void;
}

export default function CategoriesPage({ onNavigate }: CategoriesPageProps) {
  return (
    <div className="bg-black min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Course Categories</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore 11 specialized categories of free programming courses. From web development to machine learning, find the perfect learning path for your career goals.
          </p>
        </div>

        <StatsSection />

        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                {...category}
                onExplore={() => onNavigate?.('courses', category.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
