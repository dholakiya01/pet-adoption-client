import Providers from "@/store/slices/Providers";

export default function AuthLayout({ children }) {
  return (
    <Providers>
      <section className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">{children}</div>
      </section>
    </Providers>
  );
}
