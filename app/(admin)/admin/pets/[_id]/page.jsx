"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import FormWrapper from "@/components/forms/FormWrapper";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import Textarea from "@/components/forms/Textarea";
import Button from "@/components/ui/Button";

import { showErrorToast, showSuccessToast } from "@/utils/validators";
import { updatePets, viewByidPets } from "@/services/pet.service";

export default function UpdatePetPage() {
  const { _id } = useParams();
  console.log(_id,"_id...")
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); 
  const [newImage, setNewImage] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      vName: "",
      iType: "",
      vBreed: "",
      iAgeMonths: "",
      iGender: "",
      vDescription: "",
    },
  });

  /* FETCH PET BY ID */
  useEffect(() => {
    if (!_id) return;

    const fetchPet = async () => {
      try {
        const res = await viewByidPets(_id);
        const pet = res.data?.data; //  adjust if needed

        reset({
          vName: pet.vName,
          iType: String(pet.iType),
          vBreed: pet.vBreed,
          iAgeMonths: pet.iAgeMonths,
          iGender: String(pet.iGender),
          vDescription: pet.vDescription,
        });

        if (pet?.image) {
          setImagePreview(pet?.image); // existing image url
        }
      } catch {
        showErrorToast("Failed to load pet data");
      }
    };

    fetchPet();
  }, [_id, reset]);

  /* IMAGE CHANGE */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setNewImage(file);
    setValue("image", file);
    setImagePreview(URL.createObjectURL(file));
  };

  /* REMOVE IMAGE */
  const removeImage = () => {
    setNewImage(null);
    setValue("image", null);
    setImagePreview(null);
  };

  /* UPDATE PET */
  const onSubmit = async (data) => {
    console.log(data,"Data.....")
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("vName", data.vName);
      formData.append("iType", data.iType);
      formData.append("vBreed", data.vBreed);
      formData.append("iAgeMonths", data.iAgeMonths);
      formData.append("iGender", data.iGender);
      formData.append("vDescription", data.vDescription);

      // only send image if updated
      if (newImage) {
        formData.append("image", newImage);
      }

      await updatePets(_id, formData);

      showSuccessToast("Pet updated successfully");
      router.push("/admin/pets");
    } catch (error) {
      showErrorToast(
        error?.response?.data?.message || "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper title="Update Pet" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Pet Name"
          disabled={loading}
          {...register("vName", { required: "Pet name is required" })}
          error={errors.vName?.message}
        />

        <Select
          label="Pet Type"
          disabled={loading}
          {...register("iType", { required: "Type is required" })}
          error={errors.iType?.message}
        >
          <option value="">Select type</option>
          <option value="1">Dog</option>
          <option value="2">Cat</option>
        </Select>

        <Input
          label="Breed"
          disabled={loading}
          {...register("vBreed", { required: "Breed is required" })}
          error={errors.vBreed?.message}
        />

        <Input
          type="number"
          label="Age (Months)"
          disabled={loading}
          {...register("iAgeMonths", { required: true, min: 1 })}
          error={errors.iAgeMonths?.message}
        />

        <Select
          label="Gender"
          disabled={loading}
          {...register("iGender", { required: "Gender required" })}
          error={errors.iGender?.message}
        >
          <option value="">Select gender</option>
          <option value="1">Male</option>
          <option value="2">Female</option>
        </Select>

        {/* IMAGE */}
        <div>
          <label className="block mb-1 text-sm font-medium">Pet Image</label>

          {imagePreview ? (
            <div className="relative border rounded p-2">
              <img
                src={`${process.env.NEXT_PUBLIC_PORT}${imagePreview}`}
                className="h-40 w-24 object-cover rounded"
              />
              <button
                type="button"
                onClick={removeImage}
                disabled={loading}
                className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ) : (
            <input
              type="file"
              accept="image/*"
              disabled={loading}
              onChange={handleImageChange}
            />
          )}
        </div>

        <div className="md:col-span-2">
          <Textarea
            label="Description"
            {...register("vDescription", {
              required: "Description is required",
            })}
            error={errors.vDescription?.message}
          />
        </div>

        <div className="md:col-span-2 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Update Pet"}
          </Button>
        </div>
      </div>
    </FormWrapper>
  );
}
