import logo from "/rocket.png";
import "./App.css";
import LoginSignup from "./Components/LoginSignup";
import FirebaseForm from "./Components/FirebaseForm";
import { useState } from "react";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false);
      setUser({});
    });
  };

  return (
    <>
      <div>
        <a href="https://rocketacademy.co" target="_blank" rel="noreferrer">
          <img src={logo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Module 2</h1>
      <div className="card">
        {isLoggedIn ? (
          <button onClick={handleSignOut}>Sign out</button>
        ) : (
          <LoginSignup setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
        )}
        <FirebaseForm isLoggedIn={isLoggedIn} user={user} />
      </div>
    </>
  );
}

export default App;
