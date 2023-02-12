
import styles from "./Home.module.css";
import {Link} from "react-router-dom";


const Home = () => {

    // DATE
    const locale = navigator.language;
    const today = new Date();
    const dateFormatted = today.toLocaleString(locale, { dateStyle: "full" });


  return (
    <div className={`container mt-5 ${styles["home-container"]} test`}>
        <div className="row">
            <div className={`col-12 col-lg-4 pe-lg-5 text-center ${styles["col-left"]}`}>
                <h2 className="text-center mb-5">Quick Access Menu</h2>
                <p className="mb-4">{dateFormatted}</p>
                    <Link to="/todos"><button type="button" className={`mt-5 ${styles["btn-home"]}`}>TO DO TASKS</button></Link>
                    <br />
                    <Link to="/inventory"> <button type="button" className={`mt-5 ${styles["btn-home"]}`}>BOOKS INVENTORY</button></Link>
            </div>

            <div className="col-12 col-lg-8 mt-5 mt-lg-0 p-5 pt-lg-0">
                <h2 className="text-center mb-5">Our Mission Statement</h2>

                <h5 className="mt-5">1. To enrich the lives of our students through music</h5>
                <p>We strongly believe that playing a musical instrument makes life richer, more interesting and more colourful. We are proud to be able to impart this skill to our students.</p>

                <h5 className="mt-5">2. To provide quality music education tailored to our students’ goals, abilities, and interests</h5>
                <p>We listen to our students and parents carefully and do our best to tailor their lessons in a way that would best meet their individual goals, abilities, and interests.</p>

                <h5 className="mt-5">3. To create a fun, safe, friendly, and inclusive environment for both students and teachers</h5>
                <p>We are convinced that individuals learn and work best in an environment that is fun, safe, friendly, and inclusive. Maintaining such an environment is one of our top priorities.</p>
            </div>
        </div>
    </div>  
  )
}

export default Home