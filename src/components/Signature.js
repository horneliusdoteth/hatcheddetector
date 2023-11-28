import React, { useState } from "react";


const Signature = () => {
  const [copySuccess, setCopySuccess] = useState('');

  const ethAddress = "0x8D59240a9EF010cc7D1b5671CA4878C659F8D290";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ethAddress);
    setCopySuccess("hornelius.eth's Ethereum address was copied to clipboard!");
    setTimeout(() => setCopySuccess(''), 2000);
  };
  return (
    <div className="signature">
      <img
        src="./images/hornelius.jpg"
        alt="hornelius.eth"
        style={{
          width: "75px",
          height: "75px",
          position: "relative",
          borderRadius: "100px",
        }}
      />
      <p className="signature-text">
        hornelius.eth built this leveraging<br></br>the existing pixlverse api.
      </p>
      <div className="ethereum-tip" onClick={copyToClipboard} style={{ cursor: 'pointer' }}>
          <img className="eth-image" src='./images/ethereum-eth-logo-colored.svg' alt="Ethereum" style={{ width: '20px', height: '20px' }} />
        <span className="tip-text">
        Appreciate the magic? Keep me building: {ethAddress}
        {copySuccess && <div style={{ color: 'green' }}>{copySuccess}</div>}
        </span>
      </div>
    </div>
  );
};

export default Signature;
