// components/ui/textarea.jsx (or .tsx if you're using TypeScript)
import React from "react";

export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
}

