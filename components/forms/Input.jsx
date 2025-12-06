export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  className,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm">{label}</label>}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded border px-3 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
            ${error ? "border-red-500" : "border-gray-300"}
            ${className}
          `}
        {...props} // ✅ name, onChange, onBlur come from here
      />

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
