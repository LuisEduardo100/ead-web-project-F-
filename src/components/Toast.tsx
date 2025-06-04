import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = type === "success" ? "bg-green-500" : "bg-main-red";

  return (
    <div
      className={`fixed top-[10%] right-0 z-50 text-white px-4 py-3 rounded shadow-lg transition-all ${bgColor}`}
    >
      {message}
    </div>
  );
}
