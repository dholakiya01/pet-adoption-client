import Link from "next/link";

export default function PetCard({ pet }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition">
      <img
        src={pet.image}
        alt={pet.vName}
        className="h-48 w-full object-cover rounded-t-xl"
      />

      <div className="p-4 space-y-2">
        <h3 className="font-bold text-lg">{pet.vName}</h3>

        <p className="text-sm text-gray-600">
          {pet.vBreed} · {pet.iAgeMonths} months
        </p>

        <Link
          href={`/pets/${pet._id}`}
          className="inline-block mt-2 text-brand-primaryBlue font-semibold"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
