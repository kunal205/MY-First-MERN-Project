import React, { useEffect } from "react";
import NavBar from "./Components/NavBar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};
export default App;
