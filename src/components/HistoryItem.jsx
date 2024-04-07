import { useState } from "react";
import moment from "moment";
import { IoIosArrowDropdown } from "react-icons/io";

const HistoryItem = ({ data }) => {
  console.log(data);
  const [expand, setExpand] = useState(false);
  return (
    <div className="history">
      <div className="title-wrapper">
        <div>
          <span>{data.documents[0].prompt}</span>
          <span className="time-p">
            {moment(data.documents[0].createdAt).fromNow()}
          </span>
        </div>
        <IoIosArrowDropdown
          className={`history-expand-icon ${
            expand ? "expand-icon-rotate" : ""
          }`}
          onClick={() => {
            setExpand((prev) => !prev);
          }}
        />
      </div>
      {expand && (
        <div className="history-response-wrapper">
          {data.documents.map((item) => {
            return (
              <div className="first-model-wrapper" key={item._id}>
                <div className="history-metrics-wrapper">
                  <p>
                    Model Name :{" "}
                    <span className="model-name">{item.modal_name}</span>
                  </p>
                  <h4>Performance metrics</h4>
                  <div className="outputs">
                    <p>
                      Input token:{" "}
                      <span className="highlight">{item.input_tokens}</span>
                    </p>
                    <p>
                      Output token:{" "}
                      <span className="highlight">{item.output_tokens}</span>
                    </p>
                    <p>
                      Total token:{" "}
                      <span className="highlight">{item.total_tokens}</span>
                    </p>
                    <p>
                      Cost: <span className="highlight">${item.cost}</span>
                    </p>
                    <p>
                      Latency:{" "}
                      <span className="highlight">{item.latency}ms</span>
                    </p>
                    <p>
                      Time taken:{" "}
                      <span className="highlight">
                        {(item.time_taken / 1000).toFixed(2)}s
                      </span>
                    </p>
                  </div>
                </div>
                <h4>Response</h4>
                <div className="response-wrapper">
                  <p className="response-text">{item.response}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HistoryItem;
