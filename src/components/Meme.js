// function Meme() {

//   function handleChange(event) {
//     const [name, value] = event.target;
//     setMeme((prevMeme) => {
//       return {
//         ...prevMeme,
//         [name]: value,
//       };
//     });
//   }

//     //
//   }

//   return (
//     <main className="Meme">
//       <form onSubmit={onSubmit}>
//         <div className="top-inputs">
//           <input
//             type="text"
//             placeholder="Top text"
//             className="form-input"
//             onChange={handleChange}
//             name="topText"
//             value={meme.topText}
//           />
//           <input
//             type="text"
//             placeholder="Bottom text"
//             className="form-input"
//             onChange={handleChange}
//             name="bottomText"
//             value={meme.bottomText}
//           />
//         </div>
//         <button onClick={generateImg}>Get a new meme image 🖼️</button>
//         <button type="submit">Submit</button>
//       </form>
//       <div className="bottom-meme">
//         <img src={meme.randomImage} alt="Meme" className="meme-img" />
//         <h2 className="meme-text top">{meme.topText}</h2>
//         <h2 className="meme-text bottom">{meme.bottomText}</h2>
//       </div>
//     </main>
//   );
// }

// export default Meme;
//

/*

  
 }
    
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    
    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
} */

import React, { useState, useEffect } from "react";
import axios from "axios";

function Meme() {
  const [allMemes, setAllMemes] = useState([]);
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/30b1gx.jpg",
  });

  const objectToQueryParam = (obj) => {
    const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
    return "?" + params.join("&");
  };

  useEffect(() => {
    axios
      .get("https://api.imgflip.com/get_memes")
      .then((resp) => setAllMemes(resp.data.data.memes));
  }, []);

  function renderImg() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const randomUrl = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: randomUrl,
    }));
  }

  async function showText() {
    const params = {
      template_id: "181913649",
      text0: "lool",
      text1: "kitty",
      username: "kittycat00",
      password: "kittycat123",
    };
    const response = await axios.post(
      `https://api.imgflip.com/caption_image${objectToQueryParam(params)}`
    );
    // return response.data.data.url;
    setMeme(response.data.data);
    console.log(response);
  }
  showText();
  // console.log(meme);
  // console.log(showText());
  // setMeme((prevMeme, props) => ({
  //   ...prevMeme,
  //   randomImage: props.newUrl,
  // }));
  // async componentDidMount() {
  //     const article = { title: 'React POST Request Example' };
  //     const response = await axios.post('https://reqres.in/api/articles', article);
  //     this.setState({ articleId: response.data.id });
  // }
  return (
    <div>
      <form>
        <input type="text" placeholder="Top text" />
        <input type="text" placeholder="Bottom text" />
        <button type="button" onClick={renderImg}>
          Get img
        </button>
        <button type="submit">Submit</button>
      </form>
      <img src="https://i.imgflip.com/30b1gx.jpg" />
    </div>
  );
}

export default Meme;

// Make second API call to render captions
