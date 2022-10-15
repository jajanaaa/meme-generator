import React, { useState, useEffect } from "react";
import axios from "axios";

function Meme() {
  const [allMemes, setAllMemes] = useState([]); //Array of 100 memes objects

  const [meme, setMeme] = useState({
    url: "https://i.imgflip.com/1bij.jpg",
    id: "61579",
    topText: "",
    bottomText: "",
  });

  // Make a call to API to get memes array
  useEffect(() => {
    axios
      .get("https://api.imgflip.com/get_memes")
      .then((resp) => setAllMemes(resp.data.data.memes));
  }, []);

  // Display meme image
  function renderImg() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const randomUrl = allMemes[randomNumber].url;
    const randomId = allMemes[randomNumber].id;

    setMeme((prevMeme) => ({
      ...prevMeme,
      url: randomUrl,
      id: randomId,
    }));
  }

  // Get inputs values
  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  }

  const objectToQueryParam = (obj) => {
    const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
    return "?" + params.join("&");
  };

  // Make another API call to get meme captions
  useEffect(() => {
    async function showCaptions() {
      const params = {
        template_id: meme.id,
        text0: meme.topText,
        text1: meme.bottomText,
        username: "kittycat11",
        password: "kittycat11",
      };
      const response = await axios.post(
        `https://api.imgflip.com/caption_image${objectToQueryParam(params)}`
      );
      const newMeme = response.data.data.url;
      setMeme((prevMeme) => ({
        ...prevMeme,
        url: newMeme,
      }));
    }
    meme.topText && showCaptions(); // Make a call only if meme.topText is true
  }, [meme.id, meme.topText, meme.bottomText]); //Rerender if values change

  return (
    <main className="Meme">
      <div className="inputs">
        <input
          type="text"
          placeholder="Top text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
      </div>
      <button onClick={renderImg}>Get a new image</button>
      <img src={meme.url} alt={meme.name} className="meme-img" />
    </main>
  );
}

export default Meme;
