import React from "react";

function Modal({ onClose, children }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        {/* <button className="absolute top-2 right-4 text-gray-600" onClick={onClose}>
          ✖
        </button> */}
        {children}
      </div>
    </div>
  );
}

export default Modal;
