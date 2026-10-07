import React from "react";
import { X } from "lucide-react";

export default function Modal({
  open,
  title,
  children,
  onClose,
  large = false,
}) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className={`modal ${large ? "modal-large" : ""}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <span>Voyara</span>
            <h2>{title}</h2>
          </div>

          <button className="modal-close" onClick={onClose}>
            <X size={19} />
          </button>
        </div>

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}