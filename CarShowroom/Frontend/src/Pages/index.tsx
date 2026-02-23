import { FiSearch } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="h-[92vh] md:h-[88vh] bg-[#171216] overflow-hidden">

      {/* Hero Section */}
      <section className="relative h-full w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Image with Blur and Dark Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920')`,
          }}
        >
          {/* Blackened Overlay and Blur */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>

        {/* Content Layer */}
        <div className="relative z-10 w-full max-w-4xl px-6 text-center text-white">
          
          {/* Text Content */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Find Your Perfect Drive
          </h1>
          <p className="text-md md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover our premium collection of certified new and pre-owned vehicles.
             Hand-picked from a network of trusted partners to ensure every drive is reliable.
              Quality cars from multiple sources, all in one place.
          </p>

                {/* Search Bar */}
        <div className="relative max-w-lg mx-auto group mt-20">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-gray-400 text-base"><FiSearch className="text-gray-400" size={20} /></span>
        </div>
        <input
            type="text"
            className="block w-full py-3 pl-12 pr-28 bg-white text-black rounded-full text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
            placeholder="Search brand, model..."
        />
        <button className="cursor-pointer absolute right-1.5 top-1.5 bottom-1.5 bg-yellow-400 hover:bg-yellow-500 text-black px-5 rounded-full text-sm font-bold transition-colors">
            Search
        </button>
        </div>

          {/* Quick Filters / Tags */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {['Toyota', 'BMW', 'Mercedes', 'SUV', 'Electric'].map((tag) => (
              <span 
                key={tag} 
                className="px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-sm hover:bg-white/20 cursor-pointer transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}