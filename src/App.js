import React, { useState } from "react";
import "./App.css";
import UserInput from "./components/UserInput";
import Ticker from "./components/Ticker";
import PixlLabsFooter from "./components/PixlLabsFooter";
import Signature from "./components/Signature";

function App() {
  const [pixlPetId, setPixlPetId] = useState("");
  const [pixlPetData, setPixlPetData] = useState({
    isHatched: false,
    imgUrl: "",
    message: "",
  });

  const handleInputchange = (event) => {
    setPixlPetId(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `https://www.thepixlverse.io/pixlpets/${pixlPetId}`
      );
      const data = await response.json();
      const isHatched = data.attributes.some(
        (attr) =>
          attr.trait_type === "Egg" &&
          attr.value === "Hatched"
      );

      if (isHatched) {
        setPixlPetData({
          isHatched: true,
          imageUrl: data.image,
          message: `Query for Pixl Pet #${pixlPetId}<br><br>Don't get bamboozled. The egg's been hatched anon, refresh the meta data.`,
        });
      } else {
        const element = data.attributes.find(
          (attr) => attr.trait_type === "Element"
        ).value;
        let animationUrl = "";

        switch (element) {
          case "Earth":
            animationUrl = "./images/earth.webp";
            break;
          case "Fire":
            animationUrl = "./images/fire.webp";
            break;
          case "Water":
            animationUrl = "./images/water.webp";
            break;
          case "Air":
            animationUrl = "./images/air.webp";
            break;
          default:
            animationUrl = "cooking.webp";
        }

        setPixlPetData({
          isHatched: false,
          imageUrl: animationUrl,
          message: `Query for Pixl Pet #${pixlPetId}<br><br>Anon, its not hatched. Don't be a coward, scoop it before they hatch.`,
        });
      }
    } catch (error) {
      setPixlPetData({
        message:
          "We all got bamboozled, apis down.",
      });
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
            onChange={handleInputchange}
            onSubmit={handleSubmit}
            placeholder="Enter Pixl Pet ID 1-15000"
          />
        </div>
        {pixlPetData.imageUrl && (
          <div>
            <div
              className="pixl-text"
              dangerouslySetInnerHTML={{
                __html: pixlPetData.message,
              }}
            />
            <img
              src={pixlPetData.imageUrl}
              alt="Pixl Pet"
              className="pixl-image"
            />
          </div>
        )}
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
