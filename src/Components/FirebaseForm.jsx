// Import required packages and components
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../provider/UserProvider";

// Firebase local and external imports
import { push, ref, set, update } from "firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { database, storage } from "../firebase";

// Firebase Key setup
const DB_STUDENT = "students";
const DB_STORAGE_KEY = "images/";

export default function FirebaseForm({
  editing,
  setEditing,
  editingData,
  setEditingData,
}) {
  const { user: user } = useContext(UserContext);
  console.log("userinfo", user);

  // states required for Form page
  const [textInputValue, setTextInputValue] = useState(
    editing ? editingData.val.name : ""
  );
  const [location, setLocation] = useState(
    editing ? editingData.val.location : ""
  );
  // capture storage files
  const [fileInputFile, setFileInputFile] = useState(null);

  // React Router Dom navgiation to push users around.
  const navigate = useNavigate();

  // define and create the Firebase RealTimeDatabase list reference
  const studentListRef = ref(database, DB_STUDENT);

  // .then - logic to use .then over async await
  // const writeData = (e) => {
  //   e.preventDefault();
  //   const newStudentRef = push(studentListRef);
  //   const storageRefInstance = storageRef(
  //     storage,
  //     DB_STORAGE_KEY + "/" + fileInputFile.name
  //   );

  //   uploadBytes(storageRefInstance, fileInputFile).then(() => {
  //     getDownloadURL(storageRefInstance).then((url) => {
  //       set(newStudentRef, {
  //         name: textInputValue,
  //         location: location,
  //         url: url,
  //       });
  //     });
  //   });

  //   setTextInputValue("");
  //   setLocation("");
  // };

  // Logic to write a new post into the databse
  const writeData = async (e) => {
    e.preventDefault();

    // Storage reference for the new file
    const newStudentRef = push(studentListRef);
    const storageRefInstance = storageRef(
      storage,
      DB_STORAGE_KEY + fileInputFile.name
    );
    try {
      // first upload the image
      await uploadBytes(storageRefInstance, fileInputFile);
      // get the image url from firebase
      const url = await getDownloadURL(storageRefInstance);
      // set the data into the realtime database
      set(newStudentRef, {
        name: textInputValue,
        location: location,
        url: url,
        user: user.user.email,
      });
      // send user to posts page
      navigate("/posts");
    } catch (err) {
      console.log(err);
    }
    // reset inputs
    setTextInputValue("");
    setLocation("");
  };

  // Logic to edit post in the databse
  const editData = async (e) => {
    e.preventDefault();

    let url;

    // if there is a new file we will upload it
    if (fileInputFile) {
      // new storage ref for the new file
      const storageRefInstance = storageRef(
        storage,
        DB_STORAGE_KEY + fileInputFile.name
      );
      try {
        // add a new file online if there is one
        await uploadBytes(storageRefInstance, fileInputFile);
        // get the url to store in the realtime database
        url = await getDownloadURL(storageRefInstance);
      } catch (err) {
        console.log(err);
      }
    }
    // Create an update object to update information online
    const updates = {};
    updates[editingData.key] = {
      name: textInputValue,
      location: location,
      // use conditionals to either add a new item or the old item
      url: url ? url : editingData.val.url,
    };
    // firebase updating logic
    update(studentListRef, updates);

    // reset internal states
    setTextInputValue("");
    setEditingData({});
    setLocation("");
    setEditing(false);

    // push users to post page
    navigate("/posts");
  };

  return (
    <div>
      {user.user.email ? <p>Welcome back! {user.user.email}</p> : null}
      {user.isLoggedIn ? (
        <form onSubmit={editing ? editData : writeData}>
          <input
            type="text"
            value={textInputValue}
            onChange={(e) => setTextInputValue(e.target.value)}
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            type="file"
            onChange={(e) => {
              setFileInputFile(e.target.files[0]);
            }}
          />

          <input type="submit" value="submit" />
        </form>
      ) : null}

      <Link to="editProfile">edit</Link>
      <Link to="checkProfile">check</Link>
      <Outlet />
    </div>
  );
}
