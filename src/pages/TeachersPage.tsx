import InstructorCard from '../components/InstructorCard';
import { instructors } from '../data/instructorsData';

interface TeachersPageProps {
  onNavigate?: (page: string, param?: string) => void;
}

export default function TeachersPage({ onNavigate }: TeachersPageProps) {
  return (
    <div className="bg-white dark:bg-black min-h-screen pt-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Meet All Our Instructors</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Learn from industry experts with real-world experience across system design, web development, data science, and more.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructors.map((inst) => (
            <InstructorCard 
              key={inst.id} 
              {...inst} 
              onViewProfile={() => onNavigate?.('teacher-details', inst.id)}
            />
          ))}
        </div>

        <div className="mt-12 text-center text-gray-500">© {new Date().getFullYear()} DevScholar</div>
      </div>
    </div>
  );
}
