import logo from "/rocket.png";
import "./App.css";
import LocalStorageComponent from "./Components/LocalStorageComponent";
import API from "./Components/API";

function App() {
  return (
    <>
      <div>
        <a href="https://rocketacademy.co" target="_blank" rel="noreferrer">
          <img src={logo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Module 2</h1>
      <div className="card">
        <LocalStorageComponent />

        <API pokemon="charmander" />
      </div>
    </>
  );
}

export default App;
