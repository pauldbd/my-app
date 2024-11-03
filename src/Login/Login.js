// Login.js
import React, { useState } from "react";
import "../GlobalStyle/Login.css"; // You can style this component separately if needed.
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  var userManageURL = '';

  const handleSubmit = (event) => {
    event.preventDefault();// Create the payload
    const payload = { username, password };

    try {
      // Send a POST request to your API endpoint
      const response = fetch(userManageURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Check if the response is OK (status code 200)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = response.json(); // Parse the JSON response

      // Store the response data in cookies
      Cookies.set("userID", JSON.stringify(data["id"]), { expires: 7 }); // Expires in 7 days

      // You can redirect the user or perform other actions here
      console.log("Login successful, user data stored in cookies:", data);

      navigate('/');
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw new Error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
        </div>
        <div className="form-group">
            <button type="submit" onClick={() => { userManageURL = 'http://localhost:8080/api/user/login'; }} className="login-button">Login</button>
        </div>
        <div className="form-group">
            <button type="submit" onClick={() => { userManageURL = 'http://localhost:8080/api/user/register'; }} className="login-button">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
