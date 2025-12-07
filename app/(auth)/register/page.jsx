"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "@/components/forms/Input";
import Button from "@/components/ui/Button";
import FormWrapper from "@/components/forms/FormWrapper";
import Link from "next/link";
import { registerUser } from "@/services/auth.service";
import { showErrorToast, showSuccessToast } from "@/utils/validators";

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload = {
        vFullname: data.vFullname,
        vEmail: data.vEmail,
        vPassword: data.vPassword,
        iAge: Number(data.iAge),
        vPhone: data.vPhone,
        vAddress: data.vAddress,
      };

      const res = await registerUser(payload);

      showSuccessToast(res?.data?.message || "User created successfully");

      router.push("/login");
    } catch (error) {
      showErrorToast(
        error?.response?.data?.message ||
          "Something went wrong! Please try again."
      );
    }
  };

  return (
    <div className="py-10">
      <FormWrapper title="Register" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Full Name"
          {...register("vFullname", {
            required: "Full name is required",
            minLength: { value: 3, message: "Minimum 3 characters" },
          })}
          error={errors.vFullname?.message}
        />

        <Input
          label="Email"
          {...register("vEmail", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
          error={errors.vEmail?.message}
        />

        <Input
          label="Password"
          type="password"
          {...register("vPassword", {
            required: "Password is required",
            minLength: { value: 8, message: "Minimum 8 characters" },
            pattern: {
              value: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/,
              message: "Weak password",
            },
          })}
          error={errors.vPassword?.message}
        />

        <Input
          label="Age"
          type="number"
          {...register("iAge", {
            required: "Age is required",
            min: { value: 18, message: "Must be 18+" },
          })}
          error={errors.iAge?.message}
        />

        <Input
          label="Phone"
          {...register("vPhone", {
            required: "Phone is required",
            minLength: { value: 6, message: "Invalid phone" },
          })}
          error={errors.vPhone?.message}
        />

        <Input
          label="Address"
          {...register("vAddress", {
            required: "Address is required",
            minLength: { value: 5, message: "Address too short" },
          })}
          error={errors.vAddress?.message}
        />

        <Button type="submit" disabled={isSubmitting}>
          Register
        </Button>
      </FormWrapper>
      <div className="text-center py-4">
        <span>
          Already have Account?{" "}
          <Link
            className="text-blue-900 font-semibold underline"
            href={"/login"}
          >
            Login
          </Link>
        </span>
      </div>
    </div>
  );
}
