const LoadingState = ({ message = "Loading..." }) => {
  return (
    <div className="state-container loading-state">
      <div className="state-spinner"></div>

      <h3>Loading</h3>

      <p>{message}</p>
    </div>
  );
};

export default LoadingState;