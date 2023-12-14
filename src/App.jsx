// Import required packages and Components
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import LoginSignup from "./Components/LoginSignup";
import FirebaseForm from "./Components/FirebaseForm";
import FirebaseDisplay from "./Components/FirebaseDisplay";
import NavBar from "./Components/Navbar";
import { UserContext } from "./provider/UserProvider";
import { updateUser } from "./reducer/UserReducer";

// Firebase local and external imports
import { signOut } from "firebase/auth";
import {
  onChildAdded,
  onChildChanged,
  ref,
  remove,
  onChildRemoved,
} from "firebase/database";
import { database, auth } from "./firebase";

// Import required assest
import logo from "/rocket.png";
import "./App.css";

// Firebase Key setup
const DB_STUDENTS_KEY = "students";

// This component holds the lifted state and implements React Router Dom into the Application
function App() {
  // Setup the Reducer / Context
  const { UserDispatch: dispatch, user: user } = useContext(UserContext);
  console.log(user);

  // states required for App
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [students, setStudent] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editingData, setEditingData] = useState({});

  // define and create the Firebase RealTimeDatabase list reference
  const studentListRef = ref(database, DB_STUDENTS_KEY);

  // useEffect to handle the code executed on load
  useEffect(() => {
    // Update the current state if a new item is added
    onChildAdded(studentListRef, (data) => {
      setStudent((previousData) => [
        ...previousData,
        { key: data.key, val: data.val() },
      ]);
    });
    // Update the current state if an old item is removed
    onChildRemoved(studentListRef, (data) => {
      setStudent((previousData) =>
        previousData.filter((item) => item.key !== data.key)
      );
    });
    // Update the current state if an item has been edited
    onChildChanged(studentListRef, (data) => {
      setStudent((previousData) =>
        previousData.map((item) =>
          item.key === data.key ? { key: data.key, val: data.val() } : item
        )
      );
    });
  }, []);

  // Delete item function from firebase - removes from the real time database
  const deleteItem = (student) => {
    remove(ref(database, `${DB_STUDENTS_KEY}/${student.key}`));
  };

  // signout function for firebase - resets the user and isLoggedIn
  const handleSignOut = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false);
      dispatch(updateUser({ user: {} }));
    });
  };

  // this compoent ensures that the user is logged in before rendering the JSX in the browser, if the user is not logged in they get redirected
  const RequireAuth = ({ children, redirectTo, user }) => {
    const isAuthenticated = user.user.email ? true : false;
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  };

  // Code to develop the browserRouter, all children/ element components have access to navigation and history
  // Pass any required props into the components as needed
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <NavBar isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />
          <LoginSignup setIsLoggedIn={setIsLoggedIn} />
        </div>
      ),
    },
    {
      path: "/posts",
      element: (
        <div>
          <NavBar isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />

          <FirebaseDisplay
            students={students}
            isLoggedIn={isLoggedIn}
            deleteItem={deleteItem}
            setEditing={setEditing}
            setEditingData={setEditingData}
          />
        </div>
      ),
    },
    {
      path: "/form",
      element: (
        <>
          <NavBar isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />
          <RequireAuth redirectTo={"/"} user={user}>
            <FirebaseForm
              isLoggedIn={isLoggedIn}
              editing={editing}
              setEditing={setEditing}
              editingData={editingData}
              setEditingData={setEditingData}
              user={user}
            />
          </RequireAuth>
        </>
      ),
      children: [
        {
          path: "editProfile",
          element: (
            <div>
              <h3>Edit Profile</h3>
              <p>Edit me now</p>
            </div>
          ),
        },
        {
          path: "checkProfile",
          element: (
            <div>
              <h3>My Profile</h3>
              <p>Dont edit this</p>
            </div>
          ),
        },
      ],
    },
  ]);

  // JSX that is returned and displayed in the application
  return (
    <>
      <div>
        <a href="https://rocketacademy.co" target="_blank" rel="noreferrer">
          <img src={logo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Module 2</h1>
      {/* Setting up and using the Router */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
