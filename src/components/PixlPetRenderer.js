import React from "react";

const PixlPetRenderer = ({
	pixlPetData,
	shadowColor,
	submittedPixlPetId,
	isOpenSeaPetApiDown,
	isMetaDataMatch,
	isMetadataMismatch,
	metadata,
}) => {
	console.log("pixlPetData: " + JSON.stringify(pixlPetData));
	const processTraitValue = (trait) => {
		if (trait.trait_count != null) {
			const percentage = (trait.trait_count / 15000) * 100;
			const displayValue = percentage < 1 ? percentage.toFixed(2) : Math.round(percentage);
			return `${displayValue}%`;
		}
		return trait.value;
	};

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
					<div className="outermost-pet-container">
						<div
							className="card-holder"
							style={{
								width: `${pixlPetData.cardHolderSize.width * 1.4}px`,
								height: `${pixlPetData.cardHolderSize.height}px`,
								boxShadow: `0 0 20px 10px ${shadowColor}`,
							}}
						>
							<iframe
								src={pixlPetData.imageUrl}
								title="Pixl Pet Animation"
								className="card-image"
								style={{
									width: "100%",
									height: "550px",
									border: "none",
								}}
							/>
						</div>
						{metadata && metadata.length > 0 && (
							<div className="metadata-table-container">
								<table className="metadata-table">
									<thead>
                  <tr className="metadata-trait-header">
										<th colSpan="3">Omni Pet: {submittedPixlPetId}</th>
									</tr>
										<tr>
											<th>Type</th>
											<th>Trait</th>
										</tr>
									</thead>
									<tbody>
										{metadata.map((trait, index) => (
											<tr key={index}>
												<td>{trait.trait_type}</td>
												<td>
													{trait.value} {processTraitValue}
												</td>
												<td>{trait.trait_count}</td>
											</tr>
										))}
									</tbody>
									<tr className="metadata-trait-header">
										<th colSpan="3">Trait Count: {metadata.length}</th>
									</tr>
								</table>
							</div>
						)}
					</div>
				</div>
			)}
			{isOpenSeaPetApiDown ? (
				<div className="os-pet-api">
					OpenSea API Down.
					<br />
					Cross analyzation and metadata unavailable at the moment.
				</div>
			) : isMetaDataMatch ? (
				<div className="confirmation-message">
					Cross analysis confirms the Opensea metadata is current.
				</div>
			) : isMetadataMismatch ? (
				<div className="mismatch-message">
					BEWARE. Cross analysis confirms the OpenSea metadata is not current.
				</div>
			) : null}
		</div>
	);
};

export default PixlPetRenderer;
