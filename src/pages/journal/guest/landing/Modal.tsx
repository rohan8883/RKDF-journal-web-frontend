// src/components/ui/Modal.tsx
import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean; // ✅ Make sure isOpen is required
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // ✅ If isOpen is false, don't render anything

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          aria-label="Close Modal"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
