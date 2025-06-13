import React from "react";
import { Checkbox as UICheckbox } from "@/components/ui/checkbox";

export default function Checkbox({ label }) {
  return (
    <label className="flex items-center space-x-2">
      <UICheckbox />
      <span>{label}</span>
    </label>
  );
}
