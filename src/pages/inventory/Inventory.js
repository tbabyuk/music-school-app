
import styles from "./Inventory.module.css";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "../../FirebaseContext";
import BooksModal from "../../components/BooksModal";
import SalesLogModal from "../../components/SalesLogModal";
import { doc, addDoc, deleteDoc, getDocs, query, orderBy, collection, updateDoc, increment, onSnapshot, serverTimestamp } from "firebase/firestore";



const Inventory = () => {

  const [subtotal, setSubtotal] = useState("");
  const [tax, setTax] = useState("1.05");
  const [total, setTotal] = useState("");
  const [booksModal, setBooksModal] = useState(false);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [salesLogModal, setSalesLogModal] = useState(false);
  const [sales, setSales] = useState([]);


  // get db from Context
  const {db} = useContext(DataContext);

  // reference firestore collection
  const booksCol = collection(db, "books");
  const salesCol = collection(db, "sales_log");


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

  const updateSalesLog = async (title, customer, subtotal) => {
    await addDoc(salesCol, {
      title: title,
      total: (subtotal*1.05).toFixed(2),
      customer: customer,
      time: serverTimestamp()
    })
  }

  const handleSubtract = async (id, title, subtotal) => {
    const customer = prompt("Who bought this item?")
    // update target book quantity in firestore
    const docRef = doc(db, 'books', id)
    await updateDoc(docRef, { quantity: increment(-1)})
    updateSalesLog(title, customer, subtotal)
  }

  const handleDeleteSale = async (id) => {
      const docRef = doc(db, 'sales_log', id)
      await deleteDoc(docRef)
      console.log("document deleted")
  }

  const handleMessage = () => {
    alert("no items here at this time")
  }


  useEffect(() => {

    // update books state on initial render and then with every change to db data
    onSnapshot(booksCol, async (snapshot) => {

      let booksArray = [];
  
      const q = query(booksCol, orderBy("order", "asc"));
      const data = await getDocs(q);
      data.docs.forEach((item) => {
          booksArray.push({...item.data(), id: item.id})
      })

      setBooks(prev => booksArray);
    })

    }, []);


    useEffect(() => {

      // update sales log state on initial render and then with every change to sales data
      onSnapshot(salesCol, async (snapshot) => {
  
        let salesArray = [];
    
        const q = query(salesCol, orderBy("time", "desc"));
        const data = await getDocs(q);
        data.docs.forEach((item) => {
            salesArray.push({...item.data(), id: item.id})
        })
  
        setSales(prev => salesArray);
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
                onClick={() => setSalesLogModal(true)}
>                SALES LOG
              </button>
            </div>
          </div>
        </div>
        {/* Books Modal */}
        {booksModal && 
            <BooksModal books={books} setBooksModal={setBooksModal} handleSubtract={handleSubtract} />
        }
        {salesLogModal && 
            <SalesLogModal sales={sales} setSalesLogModal={setSalesLogModal} handleDeleteSale={handleDeleteSale} />
        }

    </div>
  )
}

export default Inventory