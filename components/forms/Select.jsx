import React from "react";

const Select = React.forwardRef(
  (
    {
      label,
      error,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <select
          ref={ref}
          className={`w-full rounded border px-3 py-2 text-sm bg-white
            focus:outline-none focus:ring-2 focus:ring-blue-500
            ${error ? "border-red-500" : "border-gray-300"}
            ${className}
          `}
          {...props}
        >
          {children}
        </select>

        {error && (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
