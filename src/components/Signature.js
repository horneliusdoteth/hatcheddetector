import React from "react";

const Signature = () => {
    return (
        <div className="signature">
        <img
          src="./images/sealjpg.jpg"
          alt="PIXL Token"
          style={{
            width: "100px",
            height: "100px",
            position: "relative",
            borderRadius: '100px',
          }}
          />
          <p className="signature-text">hornelius.eth built this leveraging the existing pixlverse api.</p>
        </div>
    )
}

export default Signature;