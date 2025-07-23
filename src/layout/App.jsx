import { Outlet } from "react-router-dom";
import Navbar from "../page/Shared/Navbar";

function App() {
  return (
    <div className="">
      <Navbar></Navbar>
      <main className="">
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default App;
