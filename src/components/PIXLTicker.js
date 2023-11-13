import React, {
  useState,
  useEffect,
} from "react";
import { fetchFloorPrice } from "./OpenSeaService";

const PIXLTicker = () => {
  const [priceInfo, setPriceInfo] = useState({
    usd: "Loading...",
    native: "Loading...",
  });
  const [sappySealsFloor, setSappySealsFloor] =
    useState("Loading...");
  const [
    genesisPixlPetFloor,
    setGenesisPixlPetFloor,
  ] = useState("Loading...");

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(
          "https://api.dexscreener.com/latest/dex/tokens/0x427A03Fb96D9A94A6727fbcfbBA143444090dd64"
        );
        const data = await response.json();
        const firstPair = data.pairs[0];
        const usdPrice = firstPair.priceUsd;
        const nativePrice = firstPair.priceNative;
        setPriceInfo({
          usd: usdPrice,
          native: nativePrice,
        });
      } catch (error) {
        console.error(
          "Error fetching price:",
          error
        );
        setPriceInfo({
          usd: "Error",
          native: "Error",
        });
      }
    };
    fetchPrice();

    const fetchFloors = async () => {
      const sappySealsPrice =
        await fetchFloorPrice("sappy-seals");
        console.log("Sappy Seals Floor Price1:", sappySealsPrice); 
      setSappySealsFloor(sappySealsPrice);
      console.log("Sappy Seals Floor Price:2", sappySealsPrice); 

      const genesisPixlPrice =
        await fetchFloorPrice(
          "pixl-pets-genesis"
        );
      setGenesisPixlPetFloor(genesisPixlPrice);
    };

    fetchFloors();
  }, []);

  const pixlTokenSymbol = "./images/PIXL.png";

  return (
    <div className="pixl-ticker">
      <div className="ticker-wrap">
        <div className="ticker-move">
          <div className="ticker-item">
            <img
              src={"./images/pixlverse.jpg"}
              alt="Pixlverse"
              height="25"
              style={{
                position: "relative",
                top: "5px",
                marginRight: "5px",
                borderRadius: "100px",
              }}
            />
            Pixl Pets Ξ {genesisPixlPetFloor}
          </div>
          <div className="ticker-item">
            <img
              src={"./images/sappyseals.jpg"}
              alt="Sappy Seals"
              height="25"
              style={{
                position: "relative",
                top: "5px",
                marginLeft: "25px",
                marginRight: "5px",
                borderRadius: "100px",
              }}
            />
            Sappy Seals Ξ {sappySealsFloor}
          </div>
          <div className="ticker-item">
            <img
              className="ticker-img"
              src={pixlTokenSymbol}
              alt="PIXL Token"
              height="25"
              style={{
                position: "relative",
                top: "4px",
                marginLeft: "25px",
                marginRight: "5px",
              }}
            />
            {`PIXL/USD $${priceInfo.usd} PIXL/ETH Ξ${priceInfo.native}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PIXLTicker;
