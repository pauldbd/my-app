import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleArtistLogin = () => {
    navigate("/artists");  // Route to artist's page
  };

  const handleListenerLogin = () => {
    navigate("/listeners");  // Route to listener's page
  };

  const handleAbout = () => {
    navigate("/about");  // Route to listener's page
  };

  return (
    <div className="home-container">
      <div className="login">
        <button className="artistLogin" onClick={handleArtistLogin} style={{ marginTop: "0vh" }}>
          Artists
        </button>
        <div style={{ display: "inline", cursor: "default" }}>|</div>
        <button className="listenerLogin" onClick={handleListenerLogin}>
          Listeners
        </button>
        <div style={{ display: "inline", cursor: "default" }}>|</div>
        <button className="listenerLogin" onClick={handleAbout}>
          About
        </button>
      </div>
    </div>
  );
}

export default Home;
