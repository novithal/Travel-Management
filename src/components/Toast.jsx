import React, { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(onClose, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="toast">
      <CheckCircle2 size={19} />
      <span>{message}</span>

      <button onClick={onClose}>
        <X size={16} />
      </button>
    </div>
  );
}