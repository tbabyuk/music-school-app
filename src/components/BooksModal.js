
import styles from "../pages/Inventory.module.css";


const BooksModal = ({ books, setBooksModal, handleSubtract }) => {

    const handleCloseModal = (e) => {
        if(e.target.id === "modal-overlay" || e.target.id === "close-modal-button") {
            setBooksModal(prev => false)
        }      
    }


  return (
    <div className={`${styles["modal-overlay"]}`} id="modal-overlay" onClick={handleCloseModal}>
        <span className={styles["close-modal-button"]} id="close-modal-button" onClick={handleCloseModal}>&times;</span>
        <div className={`${styles["modal-table-wrapper"]}`}>
        <table>
            <thead>
                <tr className={`${styles["modal-table-row"]}`}>
                    <th>Item #</th>
                    <th>Book Title</th>
                    <th>Qty in Stock</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody>
            {books && books.map((book, index) => {
                return (
                <tr key={index} className={`${styles["modal-table-row"]} ${book.quantity === 0 ? styles["quantity-red"] : book.quantity === 1 ? styles["quantity-yellow"] : styles["quantity-green"]}`} >
                    <td>{index + 1}</td>
                    <td>{book.title}</td>
                    <td className={styles["quantity-cell"]}><span>{book.quantity}</span><span><button disabled={book.quantity === 0} onClick={() => handleSubtract(book.id)}>subtract 1</button></span></td>
                    <td>{`$${book.subtotal}`}</td>
                </tr>
                )
            })}
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default BooksModal