import React from 'react';

const PixlPetRenderer = ({ pixlPetData, shadowColor, submittedPixlPetId, isMetaDataMatch, isMetadataMismatch }) => {
  return (
    <div>
      {pixlPetData.imageUrl && (
        <div>
          <div
            className="pixl-text"
            dangerouslySetInnerHTML={{
              __html: pixlPetData.message,
            }}
          />
          <div className="card-holder" style={{ width: `${pixlPetData.cardHolderSize.width}px`, height: `${pixlPetData.cardHolderSize.height}px`, boxShadow: `0 0 20px 10px ${shadowColor}` }}>
            <img
              src={pixlPetData.imageUrl}
              alt="Pixl Pet"
              className="card-image"
              style={{
                width: `${pixlPetData.imageSize.width}%`,
                height: `${pixlPetData.imageSize.height}px`
              }}
            />
            <div className="card-footer">
              Genesis Pixl Pet #{submittedPixlPetId}
            </div>
          </div>
        </div>
      )}

      {isMetaDataMatch && (
        <div className="confirmation-message">
          Cross analysis confirms the Opensea<br/> metadata is current.
        </div>
      )}
      {isMetadataMismatch && (
        <div className="mismatch-message">
          BEWARE. Cross analysis confirms the <br/>OpenSea metadata is not current.
        </div>
      )}
    </div>
  );
};

export default PixlPetRenderer;
