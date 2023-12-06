import bin from "./Assets/bin.png";

export default function LocalStorageDisplay(props) {
  return (
    <>
      <h3>Users</h3>
      {props.users && props.users.length > 0 ? (
        props.users.map((item) => (
          <div key={item.id}>
            <h4>
              {item.name} - {item.email}
            </h4>
            <button
              style={{ backgroundColor: "#fff" }}
              onClick={() => props.deleteItem(item)}
            >
              <img style={{ height: "25px" }} src={bin} alt="Remove" />
            </button>
            <button
              onClick={() => {
                props.setEditing(item);
                props.setName(item.name);
                props.setEmail(item.email);
              }}
            >
              Edit
            </button>
          </div>
        ))
      ) : (
        <p>Please add a user</p>
      )}
    </>
  );
}
