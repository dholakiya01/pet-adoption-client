"use client";

import { login } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/forms/Input";
import FormWrapper from "@/components/forms/FormWrapper";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (data) => {
    const res = await login(data);

    const role = res?.data?.user?.role;

    if (role === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div>
      <FormWrapper title="Login" onSubmit={handleLogin}>
        <Input
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <Button type="submit">Login</Button>
      </FormWrapper>
      <div className="text-center py-4">
        <span>No account? <Link className="text-blue-900 font-semibold underline" href={'/register'}>Signup</Link></span>
      </div>
    </div>
  );
}
