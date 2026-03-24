"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { Modal } from "./modal";

export interface ConfirmDialogOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  size?: "sm" | "md" | "lg" | "full";
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

interface ConfirmDialogContextValue {
  confirm: (options: ConfirmDialogOptions) => Promise<boolean>;
}

const ConfirmDialogContext = createContext<ConfirmDialogContextValue | null>(null);

export const useConfirmDialog = () => {
  const context = useContext(ConfirmDialogContext);
  if (!context) {
    throw new Error("useConfirmDialog must be used within a ConfirmDialogProvider");
  }
  return context;
};

export const ConfirmDialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmDialogOptions | null>(null);
  const [resolve, setResolve] = useState<((value: boolean) => void) | null>(null);

  const confirm = useCallback((options: ConfirmDialogOptions): Promise<boolean> => {
    return new Promise((res) => {
      setOptions(options);
      setResolve(() => res);
      setIsOpen(true);
    });
  }, []);

  const handleClose = useCallback(() => {
    if (resolve) {
      resolve(false);
    }
    setIsOpen(false);
    setOptions(null);
    setResolve(null);
  }, [resolve]);

  const handleConfirm = useCallback(() => {
    if (resolve) {
      resolve(true);
    }
    setIsOpen(false);
    setOptions(null);
    setResolve(null);
  }, [resolve]);

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title={options?.title}
        description={options?.message}
        confirmLabel={options?.confirmText}
        cancelLabel={options?.cancelText}
        onConfirm={handleConfirm}
        variant={options?.variant || "default"}
        size={options?.size || "sm"}
        closeOnOverlayClick={options?.closeOnOverlayClick ?? false}
        closeOnEscape={options?.closeOnEscape ?? true}
        showCloseButton={false}
      />
    </ConfirmDialogContext.Provider>
  );
};

// Standalone confirm function implementation
let globalResolve: ((value: boolean) => void) | null = null;

export const ConfirmDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmDialogOptions | null>(null);

  useEffect(() => {
    const handleOpen = (event: CustomEvent<ConfirmDialogOptions>) => {
      setOptions(event.detail);
      setIsOpen(true);
    };

    window.addEventListener("open-confirm-dialog", handleOpen as EventListener);

    return () => {
      window.removeEventListener("open-confirm-dialog", handleOpen as EventListener);
    };
  }, []);

  const handleConfirm = () => {
    if (globalResolve) {
      globalResolve(true);
      globalResolve = null;
    }
    setIsOpen(false);
    setOptions(null);
  };

  const handleCancel = () => {
    if (globalResolve) {
      globalResolve(false);
      globalResolve = null;
    }
    setIsOpen(false);
    setOptions(null);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title={options?.title}
      description={options?.message}
      confirmLabel={options?.confirmText}
      cancelLabel={options?.cancelText}
      onConfirm={handleConfirm}
      variant={options?.variant || "default"}
      size={options?.size || "sm"}
      closeOnOverlayClick={false}
      closeOnEscape={true}
      showCloseButton={false}
    />
  );
};

// Standalone confirm function - dispatch event to open the dialog
export const confirm = (options: ConfirmDialogOptions): Promise<boolean> => {
  return new Promise((resolve) => {
    globalResolve = resolve;
    window.dispatchEvent(new CustomEvent("open-confirm-dialog", { detail: options }));
  });
};
