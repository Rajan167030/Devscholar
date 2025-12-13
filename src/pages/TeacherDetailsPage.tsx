import { ArrowLeft } from 'lucide-react';
import { instructors } from '../data/instructorsData';
import YouTubeVideos from '../components/YouTubeVideos';

interface TeacherDetailsPageProps {
  teacherId: string;
  onBack: () => void;
}

export default function TeacherDetailsPage({ teacherId, onBack }: TeacherDetailsPageProps) {
  const instructor = instructors.find((i) => i.id === teacherId);

  if (!instructor) {
    return (
      <div className="min-h-screen bg-white dark:bg-black pt-24 px-6 flex flex-col items-center justify-center">
        <h1 className="text-2xl text-gray-900 dark:text-white mb-4">Instructor not found</h1>
        <button
          onClick={onBack}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Instructors</span>
        </button>

        <div className="flex flex-col md:flex-row gap-8 items-start mb-16">
          <img
            src={`https://i.pravatar.cc/300?u=${instructor.id}`}
            alt={instructor.name}
            className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-gray-200 dark:border-gray-800"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{instructor.name}</h1>
            <p className="text-xl text-blue-600 dark:text-blue-400 mb-4">{instructor.title}</p>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-3xl">
              {instructor.bio}
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {instructor.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-12">
          <YouTubeVideos
            playlistId={instructor.youtubePlaylistId}
            channelId={instructor.youtubeChannelId}
            apiKey={import.meta.env.VITE_YOUTUBE_API_KEY}
          />
        </div>
      </div>
    </div>
  );
}
