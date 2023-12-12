export default function LocalStorageForm(props) {
  return (
    <>
      <div>
        <form onSubmit={props.handleSubmit}>
          <label>Email</label>
          <br />
          <input
            type="text"
            value={props.email}
            name="email"
            onChange={(e) => props.setEmail(e.target.value)}
            placeholder="insert email"
          />
          <br />
          <label>Name</label>
          <br />
          <input
            type="text"
            value={props.name}
            name="name"
            onChange={(e) => props.setName(e.target.value)}
            placeholder="insert name"
          />
          <input type="submit" value="submit" />
        </form>
        <br />
      </div>
    </>
  );
}
