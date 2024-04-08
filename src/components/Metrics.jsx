const Metrics = ({ metrics, currency }) => {
  return (
    <div className="metrics-wrapper">
      <h4>Performance metrics</h4>
      <div>
        <p>
          Input token:{" "}
          <span className="highlight">{metrics?.input_tokens}</span>
        </p>
        <p>
          Output token:{" "}
          <span className="highlight">{metrics?.output_tokens}</span>
        </p>
        <p>
          Total token:{" "}
          <span className="highlight">{metrics?.total_tokens}</span>
        </p>
        <p>
          Cost:{" "}
          <span className="highlight">{metrics?.cost + " " + currency}</span>
        </p>
        <p>
          Latency: <span className="highlight">{metrics?.latency}s</span>
        </p>
        <p>
          Time taken:{" "}
          <span className="highlight">
            {(metrics?.time_taken / 1000).toFixed(2)}s
          </span>
        </p>
      </div>
    </div>
  );
};

export default Metrics;
