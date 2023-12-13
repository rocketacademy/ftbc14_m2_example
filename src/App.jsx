import logo from "/rocket.png";
import "./App.css";
import LoginSignup from "./Components/LoginSignup";
import FirebaseForm from "./Components/FirebaseForm";
import FirebaseDisplay from "./Components/FirebaseDisplay";
import { signOut } from "firebase/auth";
import {
  onChildAdded,
  onChildChanged,
  ref,
  remove,
  onChildRemoved,
} from "firebase/database";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { database, auth } from "./firebase";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./Components/Navbar";

const DB_STUDENTS_KEY = "students";

function App() {
  const studentListRef = ref(database, DB_STUDENTS_KEY);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  // full student list
  const [students, setStudent] = useState([]);

  // Editing
  const [editing, setEditing] = useState(false);
  const [editingData, setEditingData] = useState({});

  useEffect(() => {
    onChildAdded(studentListRef, (data) => {
      setStudent((previousData) => [
        ...previousData,
        { key: data.key, val: data.val() },
      ]);
    });

    onChildRemoved(studentListRef, (data) => {
      setStudent((previousData) =>
        previousData.filter((item) => item.key !== data.key)
      );
    });

    onChildChanged(studentListRef, (data) => {
      setStudent((previousData) =>
        previousData.map((item) =>
          item.key === data.key ? { key: data.key, val: data.val() } : item
        )
      );
    });
  }, []);

  const deleteItem = (student) => {
    remove(ref(database, `${DB_STUDENTS_KEY}/${student.key}`));
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false);
      setUser({});
    });
  };

  const RequireAuth = ({ children, redirectTo, user }) => {
    const isAuthenticated = user.email ? true : false;
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <NavBar isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />
          <LoginSignup setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
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

  return (
    <>
      <div>
        <a href="https://rocketacademy.co" target="_blank" rel="noreferrer">
          <img src={logo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Module 2</h1>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
