
import styles from "./Inventory.module.css";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "../FirebaseContext";
import BooksModal from "../components/BooksModal";
import { doc, getDocs, query, orderBy, collection, updateDoc, increment, onSnapshot } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";



const Inventory = () => {

  const [subtotal, setSubtotal] = useState("");
  const [tax, setTax] = useState("1.05");
  const [total, setTotal] = useState("");
  const [booksModal, setBooksModal] = useState(false);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");


  // get db from Context
  const {db} = useContext(DataContext);

  // reference firestore collection
  const colRef = collection(db, "books");


  const handleGetTotal = (e) => {
      e.preventDefault();
      const result = subtotal * tax;
      setTotal(prev => result.toFixed(2));
  }

  const handleBooks = (e) => {
    // find which book was selected and add it to selectedBook state
    const targetBook = books.find((book) => book.title === e.target.value)
    setSelectedBook(prev => targetBook)
  }

  const handleSubtract = async (id) => {
    // update target book quantity in firestore
    const docRef = doc(db, 'books', id)
    await updateDoc(docRef, { quantity: increment(-1)})
  }

  const handleMessage = () => {
    alert("no items here at this time")
  }


  useEffect(() => {

    // update books state on initial render and then with every change to db data
    onSnapshot(colRef, async (snapshot) => {

      let booksArray = [];
  
      const q = query(colRef, orderBy("order", "asc"));
      const data = await getDocs(q);
      data.docs.forEach((item) => {
          booksArray.push({...item.data(), id: item.id})
      })

      setBooks(prev => booksArray);
    })

    }, []);

  
  return (
    <div className={`container mt-5 p-0 ${styles.wrapper}`}>
        {/* CALCULATOR ROW */}
        <div className={`${styles["inventory-row"]}`}>
          <form className={styles["inventory-top"]} onSubmit={handleGetTotal}>
            <div>Price Calculator:</div>
            <div>
              <input
                  type="text"
                  maxLength = "8" 
                  className={`${styles["inventory-field"]} ${styles["calculator-subtotal"]}`}
                  placeholder="subtotal"
                  value={subtotal}
                  onChange={e => setSubtotal(prev => e.target.value)}
                  onClick={() => setSubtotal("")}
                />
            </div>
            <div>
              <select 
                className={styles["inventory-field"]}
                value={tax}
                onChange={e => setTax(prev => e.target.value)}
              >
                <option value={1.05}>GST (5%)</option>
                <option value={1.13}>HST (13%)</option>
              </select>
            </div>
            <div>
            <input
                type="text"
                className={`${styles["inventory-field"]} ${styles.disabled}`}
                value={total && `$${total}`}
                placeholder="total"
                disabled
                />
            </div>
            <div>
              <button className={`${styles["inventory-btn"]}`}
>                GET TOTAL
              </button>
            </div>
          </form>
        </div>

        {/* BOOKS INVENTORY ROW */}
        <div className={`${styles["inventory-row"]}`}>
          <div className={`${styles["inventory-middle"]}`}>
              <div>
                <select 
                  className={`${styles["inventory-field"]} ${styles["book-list"]}`}
                  value={selectedBook && selectedBook.title}
                  onChange={handleBooks}
                >
                  {books && books.map((book, index) => {
                    return (
                      <option key={index}>{book.title}</option>
                    )               
                  })}
                </select>
              </div>            
              <div>
                <input
                  type="text"
                  className={`${styles["inventory-field"]} ${styles.disabled}`}
                  value={selectedBook && `$${selectedBook.subtotal}`}
                  placeholder="subtotal"
                  disabled
                  />
              </div>
              <div>
                <input
                  type="text"
                  className={`${styles["inventory-field"]} ${styles.disabled}`}
                  value={selectedBook && `${selectedBook.tax * 100}%`}
                  placeholder="tax"
                  disabled
                  />
              </div>            
              <div>
                <input
                  type="text"
                  className={`${styles["inventory-field"]} ${styles.disabled}`}
                  value={selectedBook && `$${(selectedBook.subtotal * (selectedBook.tax + 1)).toFixed(2)}`}
                  placeholder="total"
                  disabled
                  />
              </div>            
              <div>
                <input
                  type="text"
                  className={`${styles["inventory-field"]} ${styles.disabled}`}
                  value={selectedBook && selectedBook.quantity}
                  placeholder="quantity"
                  disabled
                  />
              </div>
            </div>
        </div>

        {/* BUTTONS ROW */}
        <div className={`${styles["inventory-row"]}`}>
          <div className={styles["inventory-bottom"]}>
            <div>Current Inventory:</div>
            <div>
              <button 
                className={`${styles["inventory-btn"]}`}
                onClick={() => setBooksModal(true)}
>                BOOKS
              </button>
            </div>
            <div>
              <button 
                className={`${styles["inventory-btn"]}`}
                onClick={handleMessage}

>                NOTEBOOKS
              </button>
            </div>
            <div>
              <button 
                className={`${styles["inventory-btn"]}`}
                onClick={handleMessage}
>                OTHER
              </button>
            </div>
            <div>
              <button 
                className={`${styles["inventory-btn"]}`}
                onClick={handleMessage}
>                SALES LOG
              </button>
            </div>
          </div>
        </div>
        {/* Books Modal */}
        {booksModal && 
            <BooksModal books={books} setBooksModal={setBooksModal} handleSubtract={handleSubtract} />
        }

    </div>
  )
}

export default Inventory