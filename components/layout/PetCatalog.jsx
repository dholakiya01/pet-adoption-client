import { useState } from 'react';
import { Heart, MapPin, Calendar } from 'lucide-react';

export default function PetCatalog() {
  const [filter, setFilter] = useState('All');

  const pets = [
    {
      id: 1,
      name: "Max",
      type: "Dog",
      breed: "Golden Retriever",
      age: "2 years",
      gender: "Male",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400&h=400&fit=crop",
      description: "Friendly and energetic companion"
    },
    {
      id: 2,
      name: "Luna",
      type: "Cat",
      breed: "Persian",
      age: "1 year",
      gender: "Female",
      location: "Los Angeles, CA",
      image: "https://images.unsplash.com/photo-1573865526739-10c1d3a1f0cc?w=400&h=400&fit=crop",
      description: "Calm and affectionate feline"
    },
    {
      id: 3,
      name: "Charlie",
      type: "Dog",
      breed: "Labrador",
      age: "3 years",
      gender: "Male",
      location: "Chicago, IL",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop",
      description: "Loyal and playful friend"
    },
    {
      id: 4,
      name: "Bella",
      type: "Cat",
      breed: "Siamese",
      age: "6 months",
      gender: "Female",
      location: "Miami, FL",
      image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&h=400&fit=crop",
      description: "Sweet and curious kitten"
    },
    {
      id: 5,
      name: "Rocky",
      type: "Dog",
      breed: "German Shepherd",
      age: "4 years",
      gender: "Male",
      location: "Houston, TX",
      image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=400&h=400&fit=crop",
      description: "Protective and intelligent"
    },
    {
      id: 6,
      name: "Daisy",
      type: "Dog",
      breed: "Beagle",
      age: "1 year",
      gender: "Female",
      location: "Seattle, WA",
      image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400&h=400&fit=crop",
      description: "Happy and social pup"
    },
    {
      id: 7,
      name: "Whiskers",
      type: "Cat",
      breed: "Maine Coon",
      age: "2 years",
      gender: "Male",
      location: "Boston, MA",
      image: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=400&h=400&fit=crop",
      description: "Gentle giant with soft fur"
    },
    {
      id: 8,
      name: "Coco",
      type: "Dog",
      breed: "Poodle",
      age: "3 years",
      gender: "Female",
      location: "Denver, CO",
      image: "https://images.unsplash.com/photo-1616460981585-c87db33c1e96?w=400&h=400&fit=crop",
      description: "Elegant and smart companion"
    }
  ];

  const filters = ['All', 'Dogs', 'Cats'];

  const filteredPets = filter === 'All' 
    ? pets 
    : pets.filter(pet => pet.type === filter.slice(0, -1));

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-brand-softCream to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Meet Our Available Pets
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Each pet has a unique story and is waiting for a loving home
          </p>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-3 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
                  filter === f
                    ? 'bg-brand-primaryBlue text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Pet Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredPets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-brand-cream transition-colors">
                  <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 hover:fill-red-500 transition-colors" />
                </button>
                <div className="absolute bottom-4 left-4 bg-brand-primaryBlue text-white px-3 py-1 rounded-full text-sm font-medium">
                  {pet.type}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{pet.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{pet.breed}</p>
                <p className="text-sm text-gray-500 mb-4">{pet.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-brand-primaryBlue" />
                    <span>{pet.age} • {pet.gender}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-brand-primaryBlue" />
                    <span>{pet.location}</span>
                  </div>
                </div>

                <button className="w-full bg-brand-lightBlue text-brand-primaryBlue font-medium py-2.5 rounded-xl hover:bg-brand-primaryBlue hover:text-white transition-colors">
                  Adopt Me
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-10 lg:mt-12">
          <button className="bg-brand-primaryBlue text-white px-8 py-3.5 rounded-xl hover:bg-opacity-90 transition-all font-medium shadow-md hover:shadow-lg">
            View All Pets
          </button>
        </div>
      </div>
    </section>
  );
}