import * as React from "react";
import { Toast, ToastContainer, ToastType } from "./toast";

type ToastMethod = (
  title: string,
  description?: string,
  duration?: number
) => void;

interface ToastContextValue {
  toast: {
    success: ToastMethod;
    error: ToastMethod;
    info: ToastMethod;
    warning: ToastMethod;
  };
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = React.useCallback(
    (type: ToastType, title: string, description?: string, duration?: number) => {
      const id = generateId();
      const toast: Toast = {
        id,
        type,
        title,
        description,
        duration,
      };

      setToasts((prev) => [...prev, toast]);
    },
    []
  );

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = {
    success: (title: string, description?: string, duration?: number) =>
      addToast("success", title, description, duration),
    error: (title: string, description?: string, duration?: number) =>
      addToast("error", title, description, duration),
    info: (title: string, description?: string, duration?: number) =>
      addToast("info", title, description, duration),
    warning: (title: string, description?: string, duration?: number) =>
      addToast("warning", title, description, duration),
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
};
