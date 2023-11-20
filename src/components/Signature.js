import React, { useState } from "react";


const Signature = () => {
  const [copySuccess, setCopySuccess] = useState('');

  const ethAddress = "0x787946D32806650835dB716c2e7777E02c88034e";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ethAddress);
    setCopySuccess("hornelius.eth's Ethereum address was copied to clipboard!");
    setTimeout(() => setCopySuccess(''), 2000);
  };
  return (
    <div className="signature">
      <img
        src="./images/sealjpg.jpg"
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
          <img src='./images/ethereum-eth-logo-colored.svg' alt="Ethereum" style={{ width: '20px', height: '20px' }} />
        <span className="tip-text">
        Appreciate the magic? Your support helps! Tip: {ethAddress}
        {copySuccess && <div style={{ color: 'green' }}>{copySuccess}</div>}
        </span>
      </div>
    </div>
  );
};

export default Signature;
