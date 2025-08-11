// src/components/authComponents/TextArea.tsx
import React from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="space-y-1">
      <textarea
        {...props}
        className={`w-full px-4 py-3 rounded-xl bg-gray-700 border ${
          error ? "border-red-500" : "border-gray-600"
        } focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 resize-y min-h-[100px] ${className}`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default TextArea;
