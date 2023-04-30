// import styles
import styles from "./Navbar.module.css";

import { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const Navbar = () => {

  const [sidenav, setSidenav] = useState(false);

  return (
    <header>
      <div className={styles["top-nav"]}>
        <span className="material-symbols-outlined" id={styles.hamburger} onClick={() => setSidenav(!sidenav)}>{sidenav ? "close" : "menu"}</span>        
        <NavLink to="/"><img src="dcam-logo-white.png" alt="Da Capo Academy of Music Logo" /></NavLink>
      </div>
      {sidenav &&
          <motion.nav className={styles["side-nav"]} animate={{x: 200}}>
            <ul>
              <li><NavLink to="/" onClick={() => setSidenav(false)}>HOME</NavLink></li>
              <li><NavLink to="/todos" onClick={() => setSidenav(false)}>TO DO TASKS</NavLink></li>
              <li><NavLink to="/inventory" onClick={() => setSidenav(false)}>INVENTORY</NavLink></li>
            </ul>
          </motion.nav>
      }

    </header>
  )
}


export default Navbar