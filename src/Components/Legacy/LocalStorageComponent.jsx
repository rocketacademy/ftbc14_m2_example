import { useState } from "react";
import LocalStorageDisplay from "./LocalStorageDisplay";
import LocalStorageForm from "./LocalStorageForm";

export default function LocalStorageComponent() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(null);
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  const deleteItem = (item) => {
    const arrayToStore = [...users];
    const index = arrayToStore.indexOf(item);
    console.log(index);
    arrayToStore.splice(index, 1);
    setUsers(arrayToStore);
    localStorage.setItem("users", JSON.stringify(arrayToStore));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const arrayToStore = [
      ...users,
      { id: users.length, email: email, name: name },
    ];
    setName("");
    setEmail("");
    // updating both - localstorage && local/ component state
    setUsers(arrayToStore);
    localStorage.setItem("users", JSON.stringify(arrayToStore));
  };

  const editSubmit = (e) => {
    e.preventDefault();
    const arrayToStore = [...users];
    const index = arrayToStore.indexOf(editing);
    const newItem = {
      id: editing.id,
      name: name,
      email: email,
    };
    console.log(newItem);
    arrayToStore.splice(index, 1, newItem);
    // set it into component/ localstate
    setUsers(arrayToStore);
    // set it into localstorage
    localStorage.setItem("users", JSON.stringify(arrayToStore));
    setEditing(null);
    setName("");
    setEmail("");
  };

  return (
    <>
      {editing ? (
        <LocalStorageForm
          name={name}
          email={email}
          setName={setName}
          setEmail={setEmail}
          handleSubmit={editSubmit}
        />
      ) : (
        <div>
          <LocalStorageForm
            handleSubmit={handleSubmit}
            email={email}
            name={name}
            setEmail={setEmail}
            setName={setName}
          />

          <br />

          <LocalStorageDisplay
            setEditing={setEditing}
            setName={setName}
            setEmail={setEmail}
            deleteItem={deleteItem}
            users={users}
          />
        </div>
      )}
    </>
  );
}
