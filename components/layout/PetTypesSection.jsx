export default function PetTypesSection() {
  const petTypes = [
    {
      icon: "🐕",
      name: "Dogs",
      count: "120+ Available",
      color: "bg-orange-100",
      textColor: "text-orange-600"
    },
    {
      icon: "🐈",
      name: "Cats",
      count: "85+ Available",
      color: "bg-purple-100",
      textColor: "text-purple-600"
    },
    {
      icon: "🐰",
      name: "Rabbits",
      count: "25+ Available",
      color: "bg-pink-100",
      textColor: "text-pink-600"
    },
    {
      icon: "🐦",
      name: "Birds",
      count: "15+ Available",
      color: "bg-blue-100",
      textColor: "text-blue-600"
    },
    {
      icon: "🐹",
      name: "Small Pets",
      count: "30+ Available",
      color: "bg-yellow-100",
      textColor: "text-yellow-600"
    },
    {
      icon: "🐢",
      name: "Reptiles",
      count: "10+ Available",
      color: "bg-green-100",
      textColor: "text-green-600"
    }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Browse by Pet Type
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the perfect companion from our diverse selection of lovable pets
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {petTypes?.map((pet, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <div className={`${pet.color} rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2`}>
                <div className="text-5xl md:text-6xl mb-3">{pet.icon}</div>
                <h3 className={`text-lg font-bold ${pet.textColor} mb-1`}>{pet.name}</h3>
                <p className="text-sm text-gray-600">{pet.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}