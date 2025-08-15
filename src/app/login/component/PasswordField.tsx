import React from "react";

interface PasswordFieldProps {
  icon?: React.ReactNode; 
  show: boolean;
  toggle: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter: () => void;
}

export default function PasswordField({
  icon,
  show,
  toggle,
  value,
  onChange,
  onEnter,
}: PasswordFieldProps) {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
      {icon && <div className="px-3 text-gray-400">{icon}</div>}
      <input
        type={show ? "text" : "password"}
        placeholder="Password"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && onEnter()}
        className="flex-1 py-2 px-3 focus:outline-none"
      />
      <button
        type="button"
        onClick={toggle}
        className=" text-gray-500 hover:text-gray-700"
      >
        {show ? "🙈" : "👁"}
      </button>
    </div>
  );
}
