// Import required packages and components
import { useNavigate } from "react-router-dom";

// Component to display all of the student data
export default function FirebaseDisplay({
  setEditing,
  setEditingData,
  students,
  isLoggedIn,
  deleteItem,
}) {
  // React Router Dom navgiation to push users around.
  const navigate = useNavigate();

  // function to begin the process of updating and push users to the form page
  const startUpdate = (student) => {
    setEditing(true);
    setEditingData(student);
    navigate("/form");
  };

  // JSX displayed for each post
  // if the user is logged in showcase update and delete me buttons
  //could be alterd to only show if the currently logged in user is the one who posted them.
  return (
    <div>
      {students && students.length > 0 ? (
        students.map((student) => (
          <div key={student.key}>
            <img src={student.val.url} alt={student.val.url} />
            <p>Name: {student.val.name}</p>
            <p>Location: {student.val.location}</p>
            <p>{student.val.user ? student.val.user : null}</p>

            {isLoggedIn ? (
              <p>
                <button onClick={() => startUpdate(student)}>update me</button>
                <button onClick={() => deleteItem(student)}>delete</button>
              </p>
            ) : null}
          </div>
        ))
      ) : (
        <p>Add a student please</p>
      )}
    </div>
  );
}
