"use client";
import { useState, useEffect } from "react";
import { Heart, MapPin, Calendar, X } from "lucide-react";
import { getAllPets } from "@/services/pet.service";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { applyApplication } from "@/services/adoption.service";
import { useForm } from "react-hook-form";
import { showErrorToast, showSuccessToast } from "@/utils/validators";

export default function PetsPage() {
  const token = useSelector((state) => state.auth.token);
  const router = useRouter();
  const [pets, setPets] = useState([]);
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [formData, setFormData] = useState({
    vMessage: "",
  });
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Mock pets data
  useEffect(() => {
    const fetchpets = async () => {
      const res = await getAllPets();
      setPets(res.data?.data?.data);
    };
    fetchpets();
    // const mockPets = [
    //   {
    //     id: 1,
    //     name: "Max",
    //     type: "Dog",
    //     breed: "Golden Retriever",
    //     age: "2 years",
    //     gender: "Male",
    //     location: "New York, NY",
    //     image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400&h=400&fit=crop",
    //     description: "Friendly and energetic companion"
    //   },
    //   {
    //     id: 2,
    //     name: "Luna",
    //     type: "Cat",
    //     breed: "Persian",
    //     age: "1 year",
    //     gender: "Female",
    //     location: "Los Angeles, CA",
    //     image: "https://images.unsplash.com/photo-1573865526739-10c1d3a1f0cc?w=400&h=400&fit=crop",
    //     description: "Calm and affectionate feline"
    //   },
    //   {
    //     id: 3,
    //     name: "Charlie",
    //     type: "Dog",
    //     breed: "Labrador",
    //     age: "3 years",
    //     gender: "Male",
    //     location: "Chicago, IL",
    //     image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop",
    //     description: "Loyal and playful friend"
    //   },
    //   {
    //     id: 4,
    //     name: "Bella",
    //     type: "Cat",
    //     breed: "Siamese",
    //     age: "6 months",
    //     gender: "Female",
    //     location: "Miami, FL",
    //     image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&h=400&fit=crop",
    //     description: "Sweet and curious kitten"
    //   }
    // ];
    // setPets(mockPets);
  }, []);

  const handleAdoptClick = (pet) => {
    console.log(pet);
    // Check if token exists
    if (!token) {
      alert("Please login to adopt a pet");
      router.push("/login");
      return;
    }

    setSelectedPet(pet);
    setShowModal(true);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const odata = {
      iPetId: selectedPet?._id,
      vMessage: data.vMessage,
    };
    try {
      const response = await applyApplication(odata);
      console.log(response,"response.....")
      if (response.status === 200 || response.status === 201) {
        setLoading(false)
        showSuccessToast(
          response?.data?.message || "Application submitted successfully!"
        );
        setShowModal(false);
        router.push("/adoptions");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      showErrorToast(error?.response?.data?.message || "Something wrong");
    }
  };

  const filteredPets =
    filter === "All"
      ? pets
      : pets.filter((pet) => pet.type === filter.slice(0, -1));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Available Pets
        </h1>

        {/* Filters */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {["All", "Dogs", "Cats"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-xl font-medium transition-all ${
                filter === f
                  ? "bg-brand-primaryBlue text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Pet Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPets.map((pet, i) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              <div className="relative h-64">
                <img
                  src={`${process.env.NEXT_PUBLIC_PORT}${pet.image}`}
                  alt={pet.vName}
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
                <div className="absolute bottom-4 left-4 bg-brand-primaryBlue text-white px-3 py-1 rounded-full text-sm">
                  {pet.type}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {pet?.vName}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{pet.breed}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-brand-primaryBlue" />
                    <span>
                      {pet.iAge} • {pet.iGender === 1 ? "Male" : "Female"}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-brand-primaryBlue" />
                    <span>{pet.location || "Gujrat"}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleAdoptClick(pet)}
                  className="w-full bg-brand-primaryBlue text-white py-2.5 rounded-xl hover:bg-opacity-90 transition-colors font-medium"
                >
                  Adopt Me
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Adopt {selectedPet?.name}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>

                  <textarea
                    rows="4"
                    placeholder="Tell us why you want to adopt this pet..."
                    className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primaryBlue 
      ${errors.vMessage ? "border-red-500" : "border-gray-300"}`}
                    {...register("vMessage", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                      maxLength: {
                        value: 500,
                        message: "Message cannot exceed 500 characters",
                      },
                    })}
                  />

                  {errors.vMessage && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.vMessage.message}
                    </p>
                  )}
                </div>

                <button
                  disabled={loading}
                  className="w-full bg-brand-primaryBlue text-white py-3 rounded-xl hover:bg-opacity-90 transition-colors font-medium disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
