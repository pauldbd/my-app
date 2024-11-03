// Artists.js
import { useNavigate } from "react-router-dom";
import "../GlobalStyle/Login.css"; // You can style this component separately if needed.
import Login from "../Login/Login.js";
import "./Artists.css"
import Cookies from "js-cookie";
import React, { useEffect, useState } from 'react';

function Artists() {
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongFile, setNewSongFile] = useState(null);
  const userID = Cookies.get("id");
  const navigate = useNavigate();

  const [songData, setSongData] = useState([]); 

  const testing = true; 

  useEffect(() => {

    if (testing){
      const data = [
        {
            "songName": "Pratisell",
            "userId": "672729367db6ef53934b9a3b",
            "fileName": "test",
            "scores": [
                {
                    "score": 2.5,
                    "happy": 0.0,
                    "sad": 0.0,
                    "disgust": 6.0,
                    "angry": 0.0,
                    "fear": 4.0,
                    "surprise": 6.0,
                    "neutral": 0.0
                },
                {
                    "score": 2.5,
                    "happy": 0.0,
                    "sad": 0.0,
                    "disgust": 6.0,
                    "angry": 0.0,
                    "fear": 4.0,
                    "surprise": 6.0,
                    "neutral": 0.0
                },
                {
                    "score": 5.0,
                    "happy": 0.0,
                    "sad": 0.0,
                    "disgust": 6.0,
                    "angry": 0.0,
                    "fear": 4.0,
                    "surprise": 6.0,
                    "neutral": 0.0
                },
                {
                    "score": 4.0,
                    "happy": 0.0,
                    "sad": 0.0,
                    "disgust": 6.0,
                    "angry": 0.0,
                    "fear": 4.0,
                    "surprise": 6.0,
                    "neutral": 0.0
                }
            ],
            "averageScore": 3.5
        },
        {
            "songName": "Ugly",
            "userId": "672729367db6ef53934b9a3b",
            "fileName": "test",
            "scores": [
                {
                    "score": 4.0,
                    "happy": 0.0,
                    "sad": 0.0,
                    "disgust": 6.0,
                    "angry": 0.0,
                    "fear": 4.0,
                    "surprise": 6.0,
                    "neutral": 0.0
                },
                {
                    "score": 6.0,
                    "happy": 0.0,
                    "sad": 0.0,
                    "disgust": 6.0,
                    "angry": 0.0,
                    "fear": 4.0,
                    "surprise": 6.0,
                    "neutral": 0.0
                }
            ],
            "averageScore": 5.0
        }
    ]

      setSongData(data)

      console.log(data); 
    }
    else{
      // Define an async function to fetch items
      fetch('http://localhost:8080/api/user/getallsongs/' + encodeURIComponent(userID))
      .then(response => response.json())
      .then(json => setSongData(json))
    }

  }, []);


  const handleUpload = (event) => {
    event.preventDefault();// Create the payload

    const formData = new FormData();
    formData.append('file', newSongFile);

    try {
      // Send a POST request to your API endpoint
      const response = fetch("http://localhost:8080/api/audio/upload/" + newSongTitle, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      });

      // Check if the response is OK (status code 200)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      navigate('/Artists');
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw new Error("Uploading the song failed.");
    }
  };

  if (true) {
    return (
      <div className="song-viewer">
        <div className="song-addition">
          <h2>Upload a New Song</h2>
          <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column' }}>
            <input
              type="text"
              value={newSongTitle}
              onChange={setNewSongTitle}
              placeholder="Song Title"
              required
              style={{ marginBottom: '10px', padding: '10px' }}
            />
            <input
              type="file"
              accept="audio/*"
              onChange={setNewSongFile}
              required
              style={{ marginBottom: '10px', padding: '10px' }}
            />
            <button type="submit" style={{ padding: '10px' }}>Upload Song</button>
          </form>
        </div>

        <div className="song-details">
          <table className="song-table">
          <tbody>
            <tr>
                <td>Song</td>
                <td>Song Score (avg.)</td>
            </tr>
            {songData?.map((song) => {
              return(
              <tr>
                <td>{song.songName}</td>
                <td>{song.averageScore}</td>
              </tr>
              )
            })}
          </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return (
      <Login />
    );
  }
}

export default Artists;
