const ErrorState = ({
  message = "Something went wrong. Please try again.",
  onRetry,
}) => {
  return (
    <div className="state-container error-state">
      <div className="state-icon error-icon">
        !
      </div>

      <h3>Unable to load data</h3>

      <p>{message}</p>

      {onRetry && (
        <button className="state-button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;