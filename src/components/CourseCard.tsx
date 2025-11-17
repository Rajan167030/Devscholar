import { Clock, Users, Star } from 'lucide-react';

interface CourseCardProps {
  title: string;
  instructor: string;
  thumbnail: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  duration: string;
  students: number;
  rating: number;
  level: string;
}

export default function CourseCard({
  title,
  instructor,
  thumbnail,
  price,
  originalPrice,
  discount,
  duration,
  students,
  rating,
  level,
}: CourseCardProps) {
  return (
    <div className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all hover:transform hover:scale-[1.02]">
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover"
        />
        {discount && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
            {discount}% off
          </div>
        )}
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-semibold">
          {level}
        </div>
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-white line-clamp-2 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-2">
          <img
            src={`https://i.pravatar.cc/150?u=${instructor}`}
            alt={instructor}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm text-gray-400">{instructor}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{students.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={16} className="fill-yellow-500 text-yellow-500" />
            <span>{rating}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
          <div>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through mr-2">
                ${originalPrice}
              </span>
            )}
            <span className="text-2xl font-bold text-white">
              {price === 0 ? 'FREE' : `$${price}`}
            </span>
          </div>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}
