import React from "react";

interface InputFieldProps {
  icon?: React.ReactNode; // <-- NEW
  name: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  icon,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
      {icon && <div className="px-3 text-gray-400">{icon}</div>}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 py-2 px-3 focus:outline-none"
      />
    </div>
  );
}
