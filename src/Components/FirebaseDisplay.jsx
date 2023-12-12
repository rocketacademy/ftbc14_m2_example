export default function FirebaseDisplay(props) {
  return (
    <div>
      {props.students && props.students.length > 0 ? (
        props.students.map((student) => (
          <div key={student.key}>
            <img src={student.val.url} alt={student.val.url} />
            <p>Name: {student.val.name}</p>
            <p>Location: {student.val.location}</p>
            <p>{student.val.user ? student.val.user : null}</p>

            {props.isLoggedIn ? (
              <p>
                <button onClick={() => props.startUpdate(student)}>
                  update me
                </button>
                <button onClick={() => props.deleteItem(student)}>
                  delete
                </button>
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
