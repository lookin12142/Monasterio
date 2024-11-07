"use client";
import React from "react";
import { cn } from "@/app/lib/utils";

type CheckboxProps = {
  id: string;
  name: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const Checkbox: React.FC<CheckboxProps> = ({ id, name, checked = false, onChange, className }) => {
  return (
    <input
      type="checkbox"
      id={id}
      name={name}
      checked={checked}
      onChange={onChange} 
      className={cn(
        "rounded border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-offset-0 focus:ring-red-200 focus:ring-opacity-50",
        className
      )}
    />
  );
};

export default Checkbox;
