import {
  onChildAdded,
  onChildChanged,
  push,
  ref,
  set,
  update,
  remove,
  onChildRemoved,
} from "firebase/database";

import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { database, storage } from "../firebase";
import { useEffect, useState } from "react";
import FirebaseDisplay from "./FirebaseDisplay";

const DB_STUDENTS_KEY = "students";
const DB_STORAGE_KEY = "images";

export default function FirebaseForm(props) {
  // full student information
  const [students, setStudent] = useState([]);

  // capture student information
  const [textInputValue, setTextInputValue] = useState("");
  const [location, setLocation] = useState("");

  // capture storage files
  const [fileInputFile, setFileInputFile] = useState(null);

  const studentListRef = ref(database, DB_STUDENTS_KEY);

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
  }, []);

  useEffect(() => {
    console.log("running");
    onChildChanged(studentListRef, (data) => {
      const studentsArray = [...students];
      let isIndex = (element) => element.key == data.key;
      const index = studentsArray.findIndex(isIndex);
      studentsArray[index] = { key: data.key, val: data.val() };
      setStudent(studentsArray);
    });
  }, [editing]);

  // .then
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

  // await async
  const writeData = async (e) => {
    e.preventDefault();
    const newStudentRef = push(studentListRef);
    const storageRefInstance = storageRef(
      storage,
      DB_STORAGE_KEY + fileInputFile.name
    );

    try {
      await uploadBytes(storageRefInstance, fileInputFile);

      const url = await getDownloadURL(storageRefInstance);

      set(newStudentRef, {
        name: textInputValue,
        location: location,
        url: url,
        user: props.user.email,
      });
    } catch (err) {
      console.log(err);
    }

    setTextInputValue("");
    setLocation("");
  };

  const editData = (e) => {
    e.preventDefault();
    setEditing(false);

    const updates = {};
    updates[editingData.key] = {
      name: textInputValue,
      location: location,
    };
    update(studentListRef, updates);
    setTextInputValue("");
    setEditingData({});
    setLocation("");
  };

  const startUpdate = (student) => {
    setEditing(true);
    setTextInputValue(student.val.name);
    setLocation(student.val.location);
    setEditingData(student);
  };

  const deleteItem = (student) => {
    remove(ref(database, `${DB_STUDENTS_KEY}/${student.key}`));
  };

  return (
    <div>
      {props.user !== {} ? <p>Welcome back! {props.user.email}</p> : null}
      {props.isLoggedIn ? (
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

      <FirebaseDisplay
        students={students}
        startUpdate={startUpdate}
        deleteItem={deleteItem}
        isLoggedIn={props.isLoggedIn}
      />
    </div>
  );
}
