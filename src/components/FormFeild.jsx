import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  minLength,
  error = "",
  required = false,
  textarea = false,
  select = false,
  file = false,
  options = [],
  rows = 3,
  max,
  maxValue=false,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const isPassword = type === "password";
  const hasValue = value && value.toString().length > 0;
  const shouldFloat = focused || hasValue;

  const baseClasses = `
    w-full border p-3 rounded-md bg-transparent transition-all
    focus:outline-none
    ${error
      ? "border-red-500 focus:border-red-500"
      : "border-gray-300 focus:border-blue-600"}
    ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
  `;

  return (
    <div className="relative w-full mt-6">

      {/* NORMAL INPUT */}
      {!select && !textarea && !file && (
        <input
          id={name}
          type={isPassword && showPassword ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          minLength={minLength}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          className={baseClasses}
          required={required}
          max={maxValue?max:""}
        />
      )}

      {/* FILE INPUT */}
 {file && (
  <div className="w-full">


    <input
      id={name}
      type="file"
      name={name}
    onChange={onChange}
           onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
      disabled={disabled}
      className={baseClasses}
    />
  </div>
)}
      {/* TEXTAREA */}
      {textarea && (
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          className={baseClasses}
        />
      )}

      {/* SELECT */}
      {select && (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          className={baseClasses}
        >
          <option value="">Select</option>
          {options.map((opt, i) => (
            <option key={i} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
 {file && (
        <label
          htmlFor={name}
          className={`
            absolute left-3 -top-4 px-1 bg-white transition-all duration-200
          `}
        >     {label} {required && "*"}</label>
          )}
      {!file && (
        <label
          htmlFor={name}
          className={`
            absolute left-3 px-1 bg-white transition-all duration-200
            ${error ? "text-red-500" : focused ? "text-blue-600" : "text-gray-500"}
            ${shouldFloat ? "-top-2 text-sm" : "top-3 text-base"}
          `}
        >
          {label} {required && "*"}
        </label>
      )}

      {/* PASSWORD TOGGLE */}
      {isPassword && !file && (
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-4 cursor-pointer text-xl text-black select-none"
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FormField;