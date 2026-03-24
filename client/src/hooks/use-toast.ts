import { useToastContext } from "@/components/ui/toast/toast-context";

/**
 * Hook to access toast notifications.
 * Provides methods to show different types of toasts.
 *
 * @example
 * const { toast } = useToast();
 * toast.success("CP spent!", "Used Combat Squad (1 CP)");
 * toast.info("Phase changed", "Now in Shooting Phase");
 * toast.error("Error", "Failed to save game");
 * toast.warning("Warning", "Low CP remaining");
 */
export const useToast = () => {
  const { toast } = useToastContext();
  return { toast };
};
