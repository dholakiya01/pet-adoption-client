export default function AuthLayout({ children }) {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        {children}
      </div>
    </section>
  );
}