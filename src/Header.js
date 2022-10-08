import React from "react";
import Troll from "./troll-face.png";

function Header() {
  return (
    <div className="Header">
      <div>
        <img src={Troll} alt="troll face" />
        <h1>Meme Generator</h1>
      </div>
      <h2>React Course - Project 3</h2>
    </div>
  );
}

export default Header;
