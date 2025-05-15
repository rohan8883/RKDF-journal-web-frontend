import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Controller, Control } from "react-hook-form";

interface KeywordTagInputProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
}

const KeywordTagInput = ({ control, name, label, placeholder }: KeywordTagInputProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, onChange: (value: string) => void) => {
    // Add tag on Enter or comma
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();
      
      const newTag = inputValue.trim().replace(/,/g, "");
      if (newTag && !tags.includes(newTag)) {
        const updatedTags = [...tags, newTag];
        setTags(updatedTags);
        onChange(updatedTags.join(", "));
      }
      setInputValue("");
    }
    
    // Remove last tag on Backspace if input is empty
    if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      const updatedTags = tags.slice(0, -1);
      setTags(updatedTags);
      onChange(updatedTags.join(", "));
    }
  };

  const removeTag = (tagToRemove: string, onChange: (value: string) => void) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    onChange(updatedTags.join(", "));
  };

  // Parse initial value from form
  useEffect(() => {
    return () => {
      setTags([]);
      setInputValue("");
    };
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        // Parse initial values when field.value changes
        useEffect(() => {
          if (field.value && typeof field.value === "string") {
            const parsedTags = field.value
              .split(",")
              .map(tag => tag.trim())
              .filter(tag => tag);
            setTags(parsedTags);
          }
        }, [field.value]);

        return (
          <div className="w-full">
            {label && (
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
            )}
            <div
              className={`flex flex-wrap items-center gap-2 p-2 border rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 ${
                fieldState.error ? "border-red-500" : "border-gray-300"
              } bg-white`}
            >
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-md"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag, field.onChange)}
                    className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, field.onChange)}
                onBlur={() => {
                  field.onBlur();
                  // Add tag on blur if there's content
                  if (inputValue.trim()) {
                    const newTag = inputValue.trim();
                    if (!tags.includes(newTag)) {
                      const updatedTags = [...tags, newTag];
                      setTags(updatedTags);
                      field.onChange(updatedTags.join(", "));
                    }
                    setInputValue("");
                  }
                }}
                placeholder={tags.length === 0 ? placeholder || "Add keywords..." : ""}
                className="flex-1 outline-none text-sm min-w-[120px]"
              />
            </div>
            {fieldState.error && (
              <p className="mt-1 text-sm text-red-600">{fieldState.error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};

export default KeywordTagInput;