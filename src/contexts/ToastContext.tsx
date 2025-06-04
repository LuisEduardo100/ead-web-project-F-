import React, { createContext, useContext, useState, useCallback } from "react";
import Toast from "../components/Toast";

type ToastType = "success" | "error";

interface ToastData {
  message: string;
  type: ToastType;
  duration?: number;
  onAfterClose?: () => void;
}

interface ToastContextType {
  showToast: (data: ToastData) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<ToastData | null>(null);

  const showToast = useCallback((data: ToastData) => {
    setToast(data);
  }, []);

  const handleClose = () => {
    if (toast?.onAfterClose) toast.onAfterClose();
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration || 3000}
          onClose={handleClose}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error("useToast deve ser usado dentro de <ToastProvider>");
  return context;
};
