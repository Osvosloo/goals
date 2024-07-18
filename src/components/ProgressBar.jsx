const ProgressBar = ({ current, max }) => {
  const percentage = max ? (current / max) * 100 : 0;

  return (
    <div className="progress-bar">
      <div
        className="progress-bar-fill"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
