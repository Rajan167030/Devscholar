interface CategoryCardProps {
  name: string;
  description: string;
  thumbnail: string;
  courseCount: number;
  onExplore?: () => void;
}

export default function CategoryCard({
  name,
  description,
  thumbnail,
  courseCount,
  onExplore,
}: CategoryCardProps) {
  return (
    <div onClick={onExplore} className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all hover:transform hover:scale-[1.02] cursor-pointer">
      <div className="relative h-52 overflow-hidden">
        <img
          src={thumbnail}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
        </div>
      </div>

        <div className="p-6">
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-blue-500 text-sm font-semibold">
            {courseCount} Courses
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onExplore?.();
            }}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Explore →
          </button>
        </div>
      </div>
    </div>
  );
}
