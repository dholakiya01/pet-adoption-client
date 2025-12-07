"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/forms/Input";
import FormWrapper from "@/components/forms/FormWrapper";
import { useForm } from "react-hook-form";
import { authLogin } from "@/services/auth.service";
import Link from "next/link";
import { showErrorToast, showSuccessToast } from "@/utils/validators";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      vEmail: "",
      vPassword: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const res = await authLogin(data);
      console.log(res?.data, "Ress............");
      dispatch(setUser(res.data?.data));
      const role = res?.data?.data?.user?.iUserType;

      if (res.status === 200) {
        if (role === 1) {
          showSuccessToast(res.data.message || "User Login Successfully.");
          router.push("/admin/users");
        } else {
          showSuccessToast(res.data.message || 'Success.')
          router.push("/");
        }
      }
    } catch (error) {
      showErrorToast(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <FormWrapper title="Login" onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <Input
          label="Email"
          type="email"
          error={errors?.vEmail?.message}
          {...register("vEmail", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email address",
            },
          })}
        />

        {/* Password */}
        <Input
          label="Password"
          type="password"
          error={errors?.vPassword?.message}
          {...register("vPassword", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            validate: (value) => {
              if (!/[A-Z]/.test(value))
                return "Must contain at least 1 uppercase letter";
              if (!/[a-z]/.test(value))
                return "Must contain at least 1 lowercase letter";
              if (!/[0-9]/.test(value)) return "Must contain at least 1 number";
              if (!/[!@#$%^&*]/.test(value))
                return "Must contain at least 1 special character";
              return true;
            },
          })}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </FormWrapper>

      <div className="text-center py-4">
        <span>
          No account?{" "}
          <Link
            className="text-blue-900 font-semibold underline"
            href="/register"
          >
            Signup
          </Link>
        </span>
      </div>
    </div>
  );
}
