import {
  onChildAdded,
  onChildChanged,
  push,
  ref,
  set,
  update,
} from "firebase/database";
import { database } from "../firebase";
import { useEffect, useState } from "react";

const DB_STUDENTS_KEY = "students";

export default function FirebaseForm() {
  const [students, setStudent] = useState([]);
  const [textInputValue, setTextInputValue] = useState("");
  const [location, setLocation] = useState("");
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

  const writeData = (e) => {
    e.preventDefault();
    const newStudentRef = push(studentListRef);
    set(newStudentRef, {
      name: textInputValue,
      location: location,
    });
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
  return (
    <div>
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
        <input type="submit" value="submit" />
      </form>

      {students && students.length > 0 ? (
        students.map((student) => (
          <p key={student.key}>
            {student.val.name} - {student.val.location}
            <button onClick={() => startUpdate(student)}>update me</button>
          </p>
        ))
      ) : (
        <p>Add a student please</p>
      )}
    </div>
  );
}
