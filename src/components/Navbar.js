
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{background: "#c45429"}}>
        <div className="container-fluid flex-row-reverse pe-0">
            <Link className="navbar-brand" to="/"><img src="dcam-logo-white.png" alt="Da Capo Academy of Music Logo" /></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to="/">Home</NavLink>
                </li>&nbsp;&nbsp;&nbsp;
                <li className="nav-item">
                    <NavLink to="/todos">To Do Tasks</NavLink>
                </li>&nbsp;&nbsp;&nbsp;
                <li className="nav-item">
                    <NavLink to="/inventory">Books Inventory</NavLink>
                </li>
            </ul>
            </div>
        </div>
    </nav>
  )
}


export default Navbar