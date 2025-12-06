import { Heart, Search, MapPin } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-brand-softCream via-brand-cream to-brand-lightBlue min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl">🐾</div>
        <div className="absolute top-30 right-20 text-5xl">🐾</div>
        <div className="absolute bottom-20 left-1/4 text-7xl">🐾</div>
        <div className="absolute bottom-10 right-1/3 text-6xl">🐾</div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-block bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <span className="text-sm font-medium text-brand-primaryBlue">🎉 Over 1,000 Pets Adopted</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight">
              Find Your
              <span className="text-brand-primaryBlue"> Perfect </span>
              Furry Friend
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Give a loving home to adorable pets waiting for their forever family. Every adoption changes two lives - theirs and yours.
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-2 flex flex-col sm:flex-row gap-2 mb-6 max-w-2xl mx-auto lg:mx-0">
              <div className="flex items-center flex-1 px-4 py-2 border-b sm:border-b-0 sm:border-r border-gray-200">
                <Search className="w-5 h-5 text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search by breed or name"
                  className="flex-1 outline-none text-gray-700"
                />
              </div>
              <div className="flex items-center flex-1 px-4 py-2">
                <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Location"
                  className="flex-1 outline-none text-gray-700"
                />
              </div>
              <button className="bg-brand-primaryBlue text-white px-6 py-3 rounded-xl hover:bg-opacity-90 transition-all font-medium shadow-md">
                Search
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-brand-primaryBlue">250+</div>
                <div className="text-xs md:text-sm text-gray-600">Available Pets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-brand-primaryBlue">1000+</div>
                <div className="text-xs md:text-sm text-gray-600">Happy Families</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-brand-primaryBlue">50+</div>
                <div className="text-xs md:text-sm text-gray-600">Shelters</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=600&fit=crop" 
                alt="Happy pets"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              
              {/* Floating Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-lightBlue rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-brand-primaryBlue fill-brand-primaryBlue" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">Start Your Journey</div>
                    <div className="text-sm text-gray-600">Find your perfect companion today</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="hidden lg:block absolute -top-6 -right-6 w-24 h-24 bg-brand-cream rounded-full opacity-60"></div>
            <div className="hidden lg:block absolute -bottom-6 -left-6 w-32 h-32 bg-brand-lightBlue rounded-full opacity-40"></div>
          </div>
        </div>
      </div>
    </section>
  );
}