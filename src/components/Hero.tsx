import { ArrowRight, User, Archive } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-black text-white pt-24">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              UNLOCKED
              <br />
              CODING
            </h1>
            <p className="text-2xl lg:text-3xl font-semibold text-gray-300">
              become a 100xdev without selling ur kidney
            </p>
            <p className="text-lg text-blue-500 font-medium">
              enjoy lots of free stuff
            </p>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"></div>
            <img
              src="https://images.pexels.com/photos/5905857/pexels-photo-5905857.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Learning illustration"
              className="relative z-10 w-full max-w-md rounded-2xl opacity-90"
            />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="group flex items-center justify-between px-8 py-5 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl transition-all">
            <span className="text-lg font-semibold">VIEW ALL COURSES</span>
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </button>
          <button className="group flex items-center justify-between px-8 py-5 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl transition-all">
            <span className="text-lg font-semibold">VIEW ALL TEACHERS</span>
            <User className="group-hover:translate-x-1 transition-transform" size={20} />
          </button>
          <button className="group flex items-center justify-between px-8 py-5 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl transition-all">
            <span className="text-lg font-semibold">VIEW ALL CATEGORY</span>
            <Archive className="group-hover:translate-x-1 transition-transform" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
