// Artists.js
import React, { useState } from "react";
import "../GlobalStyle/Login.css"; // You can style this component separately if needed.
import "./Listeners.css"; // You can style this component separately if needed.
import Login from "../Login/Login.js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Listeners() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userID = Cookies.get("id");
  const navigate = useNavigate();
  var data = {};
  var songBytes = {};

  try {
    // Send a POST request to your API endpoint
    const response = fetch("http://localhost:8080/api/song/random", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });

    // Check if the response is OK (status code 200)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const response2 = fetch("http://localhost:8080/api/song/download/" + encodeURIComponent(data["songName"]), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    // Check if the response is OK (status code 200)
    if (!response2.ok) {
      throw new Error("Network response was not ok");
    }

    data = response.json(); // Parse the JSON response
    songBytes = response2.arrayBuffer();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw new Error("Song fetch failed.");
  }

  const videoRef = useRef(null);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
      // Start video stream
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          videoRef.current.srcObject = stream;
      });
  }, []);

  const captureFrame = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    // Draw the current frame to the canvas
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    // Convert to base64
    const dataURL = canvas.toDataURL("image/jpeg");
    const base64Image = dataURL.split(",")[1]; // Strip the prefix

    // Send to backend
    fetch("http://localhost:5000/process_frame", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image }),
    })
        .then((res) => res.json())
        .then((data) => setPrediction(data.prediction))
        .catch((err) => console.error("Error:", err));
  };


  if (!!userID) {
    return (
      <div className="viewer-wrapper">
        <div className="song-viewer">
          <div className="song-details">
            <h2>Sailor Song</h2>
            <p>by Gigi Perez</p>
            <audio controls src={() => {new Blob([songBytes], { type: "audio/mp3" })}}>
              Your browser does not support the audio element.
            </audio>

          </div>
          <div className="navigation-buttons">
            <button onClick={navigate("/listeners")}>Previous</button>
            <button onClick={navigate("/listeners")}>Next</button>
          </div>
        </div>
        <h1>Real-Time Video Processing</h1>
        <video ref={videoRef} autoPlay></video>
        <button onClick={captureFrame}>Capture Frame</button>
        {prediction && <p>Prediction: {JSON.stringify(prediction)}</p>}
      </div>
    );
  } else {
    return (
      <Login />
    );
  }
}

export default Listeners;
