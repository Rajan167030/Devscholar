import { ArrowRight } from 'lucide-react';

interface InstructorCardProps {
  id: string;
  name: string;
  title: string;
  bio: string;
  categories: string[];
  coursesCount?: number;
  onViewProfile?: () => void;
}

export default function InstructorCard({ id, name, title, bio, categories, coursesCount, onViewProfile }: InstructorCardProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <img
          src={`https://i.pravatar.cc/160?u=${id}`}
          alt={name}
          className="w-16 h-16 rounded-full object-cover border border-gray-200 dark:border-gray-800"
        />
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
        </div>
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{bio}</p>

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <span key={c} className="text-xs bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md">
            {c}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between">
        <div className="text-xs text-gray-600 dark:text-gray-400">{coursesCount ?? 0} courses</div>
        <button 
          onClick={onViewProfile}
          className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
        >
          <span>View Profile</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
