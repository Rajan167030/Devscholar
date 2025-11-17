import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import CourseCard from '../components/CourseCard';
import CategoryCard from '../components/CategoryCard';
import { courses, categories } from '../data/coursesData';

export default function HomePage() {
  return (
    <div className="bg-black min-h-screen">
      <Hero />
      <StatsSection />

      <section className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-12">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.slice(0, 6).map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-950 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-4">Popular Categories</h2>
          <p className="text-gray-400 mb-12 max-w-3xl">
            Explore specialized categories of free programming courses. From web development to machine learning, find the perfect learning path for your career goals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
