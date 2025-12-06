// components/forms/FormWrapper.js
'use client';
export default function FormWrapper({
  title,
  onSubmit,
  children,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 container"
    >
      {title && <h2 className="text-xl font-semibold">{title}</h2>}
      {children}
    </form>
  );
}
