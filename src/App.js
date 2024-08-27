import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PixlPetRenderer from "./components/PixlPetRenderer";
import UserInput from "./components/UserInput";
import Ticker from "./components/Ticker";
import PixlLabsFooter from "./components/PixlLabsFooter";
import Signature from "./components/Signature";
import "./App.css";

function App() {
  const location = useLocation();
  const [pixlPetId, setPixlPetId] = useState("");
  const [submittedPixlPetId, setSubmittedPixlPetId] = useState("");
  const [pixlPetData, setPixlPetData] = useState({
    isHatched: false,
    imageUrl: "",
    message: "",
    cardHolderSize: "",
    imageSize: "",
    openSeaMetaData: null,
  });
  const [isMetaDataMatch, setIsMetadataMatch] = useState(false);
  const [isMetadataMismatch, setIsMetadataMismatch] = useState(false);
  const [isOpenSeaPetApiDown, setIsOpenSeaPetApiDown] = useState(false);
  const [shadowColor, setShadowColor] = useState('rgba(255, 255, 255, 0.6)');
  const baseCardHolderSize = { width: 250, height: 'auto' };
  const baseImageSize = { width: '350px', height: '350px' };


  const handleInputChange = (event) => { setPixlPetId(event.target.value); };
  useEffect(() => {
    window.gtag('config', 'G-EWG9YG232B', {
      page_path: location.pathname,
    });
  }, [location])
  const fetchOpenSeaData = async () => {
    try {
      const response = await fetch(`https://ufbzadwdb4.execute-api.us-east-1.amazonaws.com/PixlPetOsAPI/${pixlPetId}`);
      const data = await response.json();
      return data.nft;
    } catch (error) {
      console.error("Error fetching data from OpenSea:", error);
      return "API_DOWN";
    }
  };

  const fetchPixlPetData = async () => {
    try {
      console.log('pixl pet id: ' + pixlPetId)
      const response = await fetch(`https://nnn9h2c1yj.execute-api.us-east-1.amazonaws.com/fetchOmniaPet/${pixlPetId}`);
      const pixlData = await response.json();
      return pixlData;
    } catch (error) {
      console.error("Error fetching data:", error);
      setPixlPetData({
        imageUrl: "./images/cooking.webp",
        message: "We all got bamboozled, apis down. Check back shortly.",
        cardHolderSize: baseCardHolderSize,
        imageSize: baseImageSize,
        openSeaMetaData: []
      });
      return [];
    }
  };
  

  const determineShadowColor = (attributes) => {
    const isDeity = attributes.some(attr => attr.trait_type === "Deity");

    if (isDeity) {
      return 'rgba(247, 231, 162, 0.6)';
    }

    const element = attributes.find(attr => attr.trait_type === "Element")?.value;
    switch (element) {
      case "Earth": return 'rgba(65, 128, 65, 0.6)';
      case "Fire": return 'rgba(205, 92, 92, 0.6)';
      case "Water": return 'rgba(100, 149, 237, 0.6)';
      case "Air": return 'rgba(211, 211, 211, 0.6)';
      default: return 'rgba(255, 255, 255, 0.6)';
    }
  };

  const handleSubmit = async () => {
    try {
    const pixlData = await fetchPixlPetData();
    const openSeaData = await fetchOpenSeaData();
   
    const newShadowColor = determineShadowColor(pixlData.attributes);
    setShadowColor(newShadowColor);

    const isHatched = pixlData.attributes.some(attr => attr.trait_type === "Egg" && attr.value === "Hatched");
    setSubmittedPixlPetId(pixlPetId);

    if (isHatched) {
      // baseCardHolderSize.width= 250;
      baseCardHolderSize.height=550;
      const imageUrl = openSeaData.animation_url;
      const urlsMatch = pixlData.image === openSeaData?.image_url;
      const isDeity = pixlData.attributes.some(attr => attr.trait_type === "Deity");

      const scaledCardHolderSize = isDeity 
      ? { width: baseCardHolderSize.width, height: baseCardHolderSize.height}
      : baseCardHolderSize;

      const scaledImageSize = isDeity 
          ? { width: baseImageSize.width * 1.3, height: baseImageSize.height * 1.3 }
          : baseImageSize;

      setIsMetadataMatch(urlsMatch);
      setIsMetadataMismatch(!urlsMatch);

      if (openSeaData === "API_DOWN") {
        setIsOpenSeaPetApiDown(true);
      } else {
        setIsOpenSeaPetApiDown(false);
      }
      setPixlPetData({
        isHatched: true,
        imageUrl: imageUrl,
        message: `Anon, don't get bamboozled. The egg's been hatched.`,
        cardHolderSize: scaledCardHolderSize,
        imageSize: scaledImageSize,
        openSeaMetaData: openSeaData?.traits,
      });
    } else {
      baseCardHolderSize.height=350;
      setIsMetadataMatch(false);
      setIsMetadataMismatch(false);
      const element = pixlData.attributes.find(attr => attr.trait_type === "Element").value;
      let eggAnimation;
      let newShadowColor;

      switch (element) {
        case "Earth":
          eggAnimation = "./images/earth.webp";
          newShadowColor = 'rgba(65, 128, 65, 0.6)';
          break;
        case "Fire":
          eggAnimation = "./images/fire.webp";
          newShadowColor = 'rgba(205, 92, 92, 0.6)';
          break;
        case "Water":
          eggAnimation = "./images/water.webp";
          newShadowColor = 'rgba(100, 149, 237, 0.6)';
          break;
        case "Air":
          eggAnimation = "./images/air.webp";
          newShadowColor = 'rgba(211, 211, 211, 0.6)';
          break;
        default:
          eggAnimation = "cooking.webp";
          newShadowColor = 'rgba(255, 255, 255, 0.6)';
      }

      setShadowColor(newShadowColor);

      setPixlPetData({
        isHatched: false,
        imageUrl: eggAnimation,
        message: `Anon, its not hatched.<br>Don't be a coward, scoop it before they hatch.`,
        cardHolderSize: baseCardHolderSize,
        imageSize: baseImageSize,
        openSeaMetaData: openSeaData?.traits,
      });
    } 
  } catch (error) {
    console.log("error fetching data idiot")
  }
  };

  return (
    <div className="App">
      <main className="content-wrapper">
        <Ticker />
        <header className="App-header">
          Is it hatched?
        </header>
        <div className="input-container">
          <UserInput
            value={pixlPetId}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            placeholder="Enter Pixl Pet ID 1-15000"
          />
        </div>
        <div className="container">
          <PixlPetRenderer 
            pixlPetData={pixlPetData} 
            shadowColor={shadowColor} 
            submittedPixlPetId={submittedPixlPetId}
            isOpenSeaPetApiDown={isOpenSeaPetApiDown}
            isMetaDataMatch={isMetaDataMatch}
            isMetadataMismatch={isMetadataMismatch}
            metadata={pixlPetData.openSeaMetaData}
          />
        </div>
      </main>
      <div>
        <Signature />
      </div>
      <div>
        <PixlLabsFooter />
      </div>
    </div>
  );
}

export default App;
