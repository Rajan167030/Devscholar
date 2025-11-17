import { BookOpen, Users, Award, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-black min-h-screen pt-24">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">About DevScholar</h1>
          <p className="text-xl text-gray-400">
            Your gateway to mastering programming and technology. Learn, build, and grow with our comprehensive courses.
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            We believe that programming education should be accessible to everyone, regardless of their background or financial situation. Our platform provides high-quality, comprehensive coding courses from industry experts, completely free of charge.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Founded in April 2024, DevScholar emerged from a simple yet powerful vision: to democratize access to world-class programming education. We recognized that traditional coding bootcamps and expensive courses were creating barriers for talented individuals who couldn't afford premium education. Our solution was to curate the best programming content from top instructors and make it freely available to everyone.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Comprehensive Curriculum</h3>
              <p className="text-gray-400">
                From fundamentals to advanced topics, our courses cover everything you need to become a professional developer.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Expert Instructors</h3>
              <p className="text-gray-400">
                Learn from industry professionals with years of real-world experience in software development.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Award className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Hands-On Projects</h3>
              <p className="text-gray-400">
                Build real-world projects that you can showcase in your portfolio and impress potential employers.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Target className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Career Focused</h3>
              <p className="text-gray-400">
                Our courses are designed to prepare you for real job opportunities and help you achieve your career goals.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-gray-300 text-lg mb-6">
            Today, we're proud to serve a thriving community of over 44,000 learners through our Telegram channel. Our students are building amazing projects, landing their dream jobs, and contributing to the tech industry.
          </p>
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
            Start Learning Today
          </button>
        </div>
      </div>
    </div>
  );
}
