import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
<div>
  <BrowserRouter>
  <Navbar></Navbar>
  <Routes>
    <Route path="/" element={<Home></Home>}></Route>
    <Route path="/home" element={<Home></Home>}></Route>
  </Routes>
  </BrowserRouter>
</div>
  );
}

export default App;
