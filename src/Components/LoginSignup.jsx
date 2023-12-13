// Import required packages and components
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Firebase local and external imports
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Component controlling the logina and signup flow of the application
export default function LoginSignup(props) {
  // states required for login page
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // React Router Dom navgiation to push users around.
  const navigate = useNavigate();

  // Signin logic with firebase
  const signin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        props.setIsLoggedIn(true);
        props.setUser(userCredential.user);
        navigate("/posts");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Signup logic with firebase
  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        props.setIsLoggedIn(true);
        props.setUser(userCredential.user);
        navigate("/posts");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //  JSX displayed on the screen
  return (
    <div>
      <label>Email:</label>
      <br />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Insert your valid email here"
      />
      <br />

      <label>Password:</label>
      <br />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Insert your password here"
      />
      <br />
      <button onClick={signup}>Sign up</button>
      <button onClick={signin}>Sign in</button>
    </div>
  );
}
