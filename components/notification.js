import React, { useEffect, useMemo } from "react";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

const Notification = ({ variant, title, description }) => {
  const { toast } = useToast();

  const showToast = useMemo(() => {
    return () => {
      toast({
        variant: variant,
        title: title,
        description: description,
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    };
  }, [toast, variant, title, description]);

  useEffect(() => {
    showToast();
  }, [showToast]);

  return null; // Since we're auto-triggering the toast, no need to render anything
};

export default Notification;
