import React, { useState } from "react";
import axios from "axios";

function Meme() {
  const [url, setUrl] = useState("https://i.imgflip.com/30b1gx.jpg");
  const [topText, setTopText] = useState("");

  function showImg(response) {
    const memesArray = response.data.data.memes;
    let randomNumber = Math.floor(Math.random() * memesArray.length);
    let randomUrl = memesArray[randomNumber].url;
    setUrl(randomUrl);
  }

  function generateImg() {
    const url = "https://api.imgflip.com/get_memes";
    axios.get(url).then(showImg);
  }

  // Api caption
  function showText(response) {
    console.log(response);
  }

  const captionURL = "https://api.imgflip.com/caption_image";
  const params = {
    // template_id: template.id,
    username: "kittycat00",
    password: "kittycat123",
    text0: topText,
  };

  axios.post(captionURL, params).then(showText);

  function displayInput(event) {
    setTopText(event.target.value);
    console.log(event.target.value);
  }

  return (
    <main className="Meme">
      <div>
        <div className="top-inputs">
          <input
            type="text"
            placeholder="Top text"
            value={topText}
            onChange={displayInput}
          />
          <input type="text" placeholder="Bottom text" />
        </div>
        <button onClick={generateImg}>Get a new meme image 🖼️</button>
      </div>
      <img src={url} alt="Meme" className="meme-img" />
    </main>
  );
}

export default Meme;
