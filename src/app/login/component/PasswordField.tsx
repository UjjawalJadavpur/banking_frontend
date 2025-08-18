import React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

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
    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
      {icon && <div className="px-3 text-gray-400">{icon}</div>}
      <input
        name="password"
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
        aria-label={show ? "Hide password" : "Show password"}
        className=" text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
      </button>
    </div>
  );
}
