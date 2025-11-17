import { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import { courses, categories } from '../data/coursesData';
import { Filter } from 'lucide-react';

interface CoursesPageProps {
  initialCategory?: string;
}

export default function CoursesPage({ initialCategory }: CoursesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory ?? 'All');

  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const filteredCourses =
    selectedCategory === 'All'
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  return (
    <div className="bg-black min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-6">All Courses</h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            Browse our complete collection of free programming courses. Learn at your own pace with high-quality content from industry experts.
          </p>
        </div>

        <div className="mb-8 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-gray-400">
            <Filter size={20} />
            <span className="font-semibold">Filter by:</span>
          </div>
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === 'All'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
            }`}
          >
            All Courses
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category.name
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <p className="text-gray-400">
            Showing <span className="text-white font-semibold">{filteredCourses.length}</span> courses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
}
