
import styles from "../pages/inventory/Inventory.module.css";


const SalesLogModal = ({ sales, setSalesLogModal, handleDeleteSale }) => {

    const handleCloseModal = (e) => {
        if(e.target.id === "modal-overlay" || e.target.id === "close-modal-button") {
            setSalesLogModal(prev => false)
        }      
    }


  return (
    <div className={`${styles["modal-overlay"]}`} id="modal-overlay" onClick={handleCloseModal}>
        <span className={styles["close-modal-button"]} id="close-modal-button" onClick={handleCloseModal}>&times;</span>
        <div className={`${styles["modal-table-wrapper"]}`}>
        <table>
            <thead>
                <tr className={`${styles["sales-table-header-row"]}`}>
                    <th className="text-center">Item #</th>
                    <th>Customer</th>
                    <th>Book Sold</th>
                    <th>Total Price</th>
                    <th>Date of Sale</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {sales && sales.map((item, index) => {
                return (
                <tr key={index} className={`${styles["sales-table-data-row"]} ${styles["quantity-green"]}`} >
                    <td>{index + 1}</td>
                    <td>{item.customer}</td>
                    <td>{item.title}</td>
                    <td>${item.total}</td>
                    <td>{item.time.toDate().toDateString()}</td>
                    <td><button className={`${styles["delete-btn"]}`} onClick={() => handleDeleteSale(item.id)}>delete</button></td>
                </tr>
                )
            })}
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default SalesLogModal