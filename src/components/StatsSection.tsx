export default function StatsSection() {
  const stats = [
    { value: '38+', label: 'Total Courses' },
    { value: '11', label: 'Categories' },
    { value: '8', label: 'Active Categories' },
    { value: '5', label: 'Avg per Category' },
  ];

  return (
    <div className="bg-black py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center hover:border-gray-700 transition-colors"
            >
              <div className="text-5xl font-bold text-blue-500 mb-3">{stat.value}</div>
              <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
