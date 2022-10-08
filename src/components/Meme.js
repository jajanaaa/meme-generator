import React from "react";

function Meme() {
  return (
    <main>
      <form className="Meme">
        <div className="top-inputs">
          <input type="text" placeholder="Top text" />
          <input type="text" placeholder="Bottom text" />
        </div>
        <button value="Get a new meme image 🖼️"></button>
      </form>
    </main>
  );
}

export default Meme;
