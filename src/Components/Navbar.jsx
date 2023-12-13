// Import required packages and compoents
import { Link } from "react-router-dom";

// Component faciliating navigation through the application
export default function NavBar(props) {
  //  JSX displayed on the screen
  return (
    <div>
      {/* Conditional statement to showcase which button should be shown depending if the user is logged in */}
      {props.isLoggedIn ? (
        <>
          <Link to="/form">Form</Link>
          <Link to="/posts">Posts</Link>
          <button onClick={props.handleSignOut}>Sign Out</button>
        </>
      ) : (
        <>
          <Link to="/">Login/ Signup</Link>
          <Link to="/posts">Posts</Link>
        </>
      )}
    </div>
  );
}
