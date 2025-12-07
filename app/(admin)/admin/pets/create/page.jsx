"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

import FormWrapper from "@/components/forms/FormWrapper";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import Textarea from "@/components/forms/Textarea";
import Button from "@/components/ui/Button";
import { createPets } from "@/services/pet.service";
import { showErrorToast, showSuccessToast } from "@/utils/validators";
import { useRouter } from "next/navigation";

export default function CreatePetPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log("FORM DATA =>", data);

      const formData = new FormData();

      // text fields
      formData.append("vName", data?.vName || "");
      formData.append("iType", data?.iType || "");
      formData.append("vBreed", data?.vBreed || "");
      formData.append("iAgeMonths", data?.iAgeMonths || null);
      formData.append("iGender", data?.iGender || null);
      formData.append("vDescription", data?.vDescription || "");

      // image field
      if (data?.image instanceof File) {
        formData.append("image", data.image);
      }

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      console.log(formData,"formdata....")
      const res = await createPets(formData);
      if (res.status == 200) {
        showSuccessToast(res.data.message || "Pet create successfully.");
        router.push("/admin/pets");
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      showErrorToast(err.response?.data?.message || "Something went wrong");
    }
  };

  /*  IMAGE HANDLER (NO PAGE RELOAD) */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue("image", file);
    setImagePreview(URL.createObjectURL(file));
  };

  /*  REMOVE IMAGE */
  const removeImage = () => {
    setValue("image", null);
    setImagePreview(null);
  };

  return (
    <FormWrapper
      title="Create Pet"
      onSubmit={handleSubmit(onSubmit)}
      enctype="multipart/formdata"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pet Name */}
        <Input
          label="Pet Name"
          placeholder="Enter pet name"
          disabled={loading}
          {...register("vName", { required: "Pet name is required" })}
          error={errors.vName?.message}
        />

        {/* Pet Type */}
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

        {/* Breed */}
        <Input
          label="Breed"
          placeholder="Enter breed"
          disabled={loading}
          {...register("vBreed", { required: "Breed is required" })}
          error={errors.vBreed?.message}
        />

        {/* Age */}
        <Input
          type="number"
          label="Age (Months)"
          placeholder="Ex: 12"
          disabled={loading}
          {...register("iAgeMonths", {
            required: "Age required",
            min: { value: 1, message: "Invalid age" },
          })}
          error={errors.iAgeMonths?.message}
        />

        {/* Gender */}
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

        {/*  Image Upload */}
        <div>
          <label className="block mb-1 text-sm font-medium">Pet Image</label>

          {!imagePreview ? (
            <input
              type="file"
              accept="image/*"
              disabled={loading}
              onChange={handleImageChange}
              className="w-full rounded border px-3 py-2 text-sm"
            />
          ) : (
            <div className="relative border rounded p-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-40 w-20 object-cover rounded"
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
          )}

          {errors.image && (
            <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Description (Full Width) */}
        <div className="md:col-span-2">
          <Textarea
            label="Description"
            rows={4}
            disabled={loading}
            {...register("vDescription", {
              required: "Description is required",
            })}
            error={errors.vDescription?.message}
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Create Pet"}
          </Button>
        </div>
      </div>
    </FormWrapper>
  );
}
