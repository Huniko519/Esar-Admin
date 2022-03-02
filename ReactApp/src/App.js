import React, { useEffect } from "react";
import "./App.css";
import setToken from "./auth/auth";
import Routes from "./Routes";
function App() {
  console.disableYellowBox = true;
  useEffect(() => {
    setToken();
  }, []);
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;

