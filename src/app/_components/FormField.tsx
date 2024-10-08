"use client";

import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useController, type UseControllerProps } from "react-hook-form";

interface IFormField {
  name: string;
  placeholder?: string;
  type?: "text" | "select" | "password" | "number" | "date" | "radio";
  value?: string;
  leftAdornment?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormFieldProps = IFormField & UseControllerProps<any>;

const FormField = ({
  name,
  placeholder,
  control,
  type = "text",
  value,
  leftAdornment,
}: FormFieldProps) => {
  const {
    field,
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({
    control,
    name,
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  if (type === "radio") {
    return (
      <label
        htmlFor={name}
        className="flex flex-col items-center text-red-300 px-2"
      >
        <input
          {...field}
          type="radio"
          className="p-3 text-green-600 border-2 border-green-400 focus:border-green-500 focus:ring-green-500"
          disabled={isSubmitting}
          value={value}
          id={placeholder}
          checked={field.value === value}
        />
        {placeholder}
      </label>
    );
  }

  if (type === "password") {
    return (
      <div className="form-control">
        <div className="relative">
          <input
            {...field}
            placeholder={placeholder}
            type={showPassword ? "text" : "password"}
            className="rounded-lg p-4 w-full my-1 text-slate-700 border-2 border-slate-400 focus:border-slate-500 focus:ring-green-500"
            disabled={isSubmitting}
            onChange={field.onChange}
          />
          <div className="absolute top-5 right-4 text-slate-500 hover:text-slate-600">
            <button className="w-6" onClick={handleShowPassword} type="button">
              {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
            </button>
          </div>
        </div>
        <p className="text-red-300">{error?.message}</p>
      </div>
    );
  }

  if (leftAdornment) {
    return (
      <div className="form-control">
        <div className="relative">
          <div className="absolute top-[22px] left-4 text-slate-600 hover:text-slate-700">
            <span>{leftAdornment}</span>
          </div>
          <input
            {...field}
            placeholder={placeholder}
            type={"text"}
            className=" rounded-lg p-4 pl-8 w-full my-1 text-slate-700 border-2 border-slate-400 focus:border-slate-500 focus:ring-green-500"
            disabled={isSubmitting}
            onChange={field.onChange}
          />
        </div>
        <p className="text-red-300">{error?.message}</p>
      </div>
    );
  }

  return (
    <div className="form-control">
      <input
        {...field}
        placeholder={placeholder}
        type={type}
        className="rounded-lg p-4 w-full my-1 text-slate-700 border-2 border-slate-400 focus:border-slate-500 focus:ring-green-500"
        disabled={isSubmitting}
        onChange={field.onChange}
      />
      <p className="text-red-300">{error?.message}</p>
    </div>
  );
};

export default FormField;
