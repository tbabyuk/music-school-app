import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Todos from "./pages/Todos";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./index.css"
import FirebaseContextProvider from "./FirebaseContext";


function App() {
  return (
    <FirebaseContextProvider>
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="todos" element={<Todos />} />
            <Route path="inventory" element={<Inventory />} />
        </Routes>
      </BrowserRouter>
    </FirebaseContextProvider>
  );
}

export default App;