import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Inventory from "./pages/inventory/Inventory";
import Todos from "./pages/todos/Todos";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./index.css"
import FirebaseContextProvider from "./context/FirebaseContext";


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
