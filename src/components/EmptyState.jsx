const EmptyState = ({
  title = "No data found",
  message = "There are no records available to display.",
  actionText,
  onAction,
}) => {
  return (
    <div className="state-container empty-state">
      <div className="state-icon empty-icon">
        ✦
      </div>

      <h3>{title}</h3>

      <p>{message}</p>

      {actionText && onAction && (
        <button className="state-button" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;