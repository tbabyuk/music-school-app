
import styles from "./Todos.module.css";
import { useState, useEffect, useContext } from "react";
import { doc, deleteDoc, getDocs, query, orderBy, addDoc, collection, serverTimestamp, updateDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { DataContext } from "../FirebaseContext";



const Todos = () => {

    const [content, setContent] = useState("");
    const [importance, setImportance] = useState("low");
    const [todoColumn, setTodoColumn] = useState([]);
    const [progressColumn, setProgressColumn] = useState([]);
    const [completedColumn, setCompletedColumn] = useState([]);

    // get db from Context
    const {db} = useContext(DataContext);

    // reference firestore collection
    const colRef = collection(db, "todos");

    
    const handleEdit = async (e) => {

        // get target item's current column and id
        const currentColumn = e.target.parentElement.parentElement.parentElement.id;
        const targetItemId = e.target.parentElement.parentElement.getAttribute("data-id");
        const newContent = prompt("enter new text:");

        if(currentColumn === "todo-column") {        
            const stateCopy = todoColumn;
            stateCopy.forEach((todo) => {
                if(todo.id === targetItemId) {
                    todo.content = newContent
                }
            })
            setTodoColumn(prev => [...stateCopy])

        } else if(currentColumn === "progress-column") {
            const stateCopy = progressColumn;
            stateCopy.forEach((todo) => {
                if(todo.id === targetItemId) {
                    todo.content = newContent
                }
            })
            setProgressColumn(prev => [...stateCopy])
        }

        // update item content in firebase
        const docRef = doc(db, "todos", targetItemId)
        await updateDoc(docRef, {
            content: newContent
        })
    }

    const handleDelete = async (e) => {

        // get target item's current column and id
        const currentColumn = e.target.parentElement.parentElement.parentElement.id;
        const targetItemId = e.target.parentElement.parentElement.getAttribute("data-id");

        // perform delete based on item column
        if(currentColumn === "todo-column") {
            setTodoColumn(todoColumn.filter((item) => item.id !== targetItemId));
        } else if(currentColumn === "progress-column") {
            setProgressColumn(progressColumn.filter((item) => item.id !== targetItemId));
        } else {
            setCompletedColumn(completedColumn.filter((item) => item.id !== targetItemId));
        }

        // delete item in firestore
        const docRef = doc(db, "todos", targetItemId)
        await deleteDoc(docRef);
    }


    const handleMove = async (e) => {

        // get target item's current column and id
        const currentColumn = e.target.parentElement.parentElement.parentElement.id;
        const targetItemId = e.target.parentElement.parentElement.getAttribute("data-id");

        if(currentColumn === "todo-column") {

            // update item column name in database
            const docRef1 = doc(db, "todos", targetItemId);
            await updateDoc(docRef1, {
                col: "progress"
            });

            // update column name in ui (separately from db to minimize requests)
            const targetItem = todoColumn.find((item) => {
                return item.id === targetItemId
            });
            targetItem.col = "progress"
            setProgressColumn(prev => [...progressColumn, targetItem ])
            // remove target item from todo column
            setTodoColumn(prev => todoColumn.filter((item) => item.id !== targetItemId))

        } else if(currentColumn === "progress-column") {

            // update item column name in database
            const docRef2 = doc(db, "todos", targetItemId);
            await updateDoc(docRef2, {
                col: "completed"
            });

            // update column name in ui (separately from db to minimize requests)
            const targetItem = progressColumn.find((item) => {
                return item.id === targetItemId
            });
            targetItem.col = "completed"
            setCompletedColumn(prev => [...completedColumn, targetItem ])
            // remove target item from progress column
            setProgressColumn(prev => progressColumn.filter((item) => item.id !== targetItemId))
        }
    }


    // handle form submit to create a new todo item
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(content && importance) {

            // add new todo to firestore
            const newDoc = await addDoc(colRef, {
                content,
                importance,
                col: "todo",
                created_at: serverTimestamp()
            })

            setTodoColumn(prev => {
                return [...todoColumn, {content, importance, id: newDoc.id, col: "todo"}]
            });

            setContent("");
            setImportance(prev => "low");

        } else {
            alert("please enter to-do item content")
        }
    }


    useEffect(() => {

        const retrieveTodos = async () => {

            let todoItems = [];
            let progressItems = [];
            let completedItems = [];


            const q = query(colRef, orderBy("created_at", "asc"));
            const data = await getDocs(q);
            data.docs.forEach((item) => {
                if(item.data().col === "todo") {
                    todoItems.push({...item.data(), id: item.id})
                } else if(item.data().col === "progress") {
                    progressItems.push({...item.data(), id: item.id})
                } else {
                    completedItems.push({...item.data(), id: item.id})
                }
                setTodoColumn(prev => [...todoItems]);
                setProgressColumn(prev => [...progressItems]);
                setCompletedColumn(prev => [...completedItems]);
            })
        };
        retrieveTodos();
        }, [])
    

  return (
    <div className="container mt-5 test">
        <form className={`row ${styles["todos-header"]}`} onSubmit={handleSubmit}>
            <div className="col-12 col-lg-4 py-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="new to do item" 
                    maxLength = "80" 
                    value={content} 
                    onChange={e => setContent(e.target.value)} 
                />
            </div>
            <div className={`col-12 col-lg-4 py-3 d-flex justify-center ${styles["importance-container"]}`}>
                <div className="input-field">
                    <input 
                        type="radio"
                        checked={importance === "low"} 
                        id="low" 
                        name="importance" 
                        value="low" 
                        onChange={() => setImportance("low")} 
                    />&nbsp;&nbsp;
                    <label htmlFor="low">Low</label>
                </div>
                <div className="input-field">
                    <input 
                        type="radio"
                        checked={importance === "medium"}
                        id="medium" 
                        name="importance" 
                        value="medium" 
                        onChange={() => setImportance("medium")} 
                    />&nbsp;&nbsp;
                    <label htmlFor="medium">Medium</label>
                </div>
                <div className="input-field">
                    <input 
                        type="radio"
                        checked={importance === "high"}
                        id="high" 
                        name="importance" 
                        value="high"
                        onChange={() => setImportance("high")} 
                    />&nbsp;&nbsp;
                    <label htmlFor="high">High</label>
                </div>
            </div>
            <div className={`col-12 col-lg-4 py-3 ${styles["button-container"]}`}>
                <button type="submit" className={`btn ${styles["btn-submit"]}`}>Add Item</button>
            </div>
        </form>

        <div className={`container ${styles["todos-table"]}`}>
            <div className={`row ${styles["todos-table-header"]}`}>
                    <div className="col d-none d-lg-block text-center">Items To Do</div>
                    <div className="col d-none d-lg-block text-center">Items In Progress</div>
                    <div className="col d-none d-lg-block text-center">Completed Items</div>
            </div>
            <div className={`row ${styles["todos-table-content"]}`}>
                    <div className={`col-12 col-lg-4 ${styles["todo-column"]}`} id="todo-column">
                    {todoColumn && (
                        todoColumn.map(item => {
                            return (
                                <li key={item.id} className={`${styles[`${item.importance}`]} ${styles["to-do-item"]}`} data-id={item.id}>
                                    <span className="pe-3">{item.content}{item.priority}</span>
                                    <span className="d-flex justify-content-between align-items-center"><i className={`far fa-edit ${styles.edit}`} onClick={handleEdit}></i><i className={`far fa-trash-alt ${styles.delete}`} onClick={handleDelete}></i><i className={`fas fa-chevron-circle-right ${styles.move}`} onClick={handleMove}></i></span>
                                </li>
                            )
                        })
                    )}
                    </div>
                    <div className={`col-12 col-lg-4 ${styles["progress-column"]}`} id="progress-column">
                    {progressColumn && (
                        progressColumn.map(item => {
                            return (
                                <li key={item.id} className={`${styles[`${item.importance}`]} ${styles["to-do-item"]}`} data-id={item.id}>
                                    <span className="pe-3">{item.content}{item.priority}</span>
                                    <span className="d-flex justify-content-between align-items-center"><i className={`far fa-edit ${styles.edit}`} onClick={handleEdit}></i><i className={`far fa-trash-alt ${styles.delete}`} onClick={handleDelete}></i><i className={`fas fa-chevron-circle-right ${styles.move}`} onClick={handleMove}></i></span>
                                </li>
                            )
                        })
                    )}
                    </div>
                    <div className={`col-12 col-lg-4 ${styles["completed-column"]}`}>
                    {completedColumn && (
                        completedColumn.map(item => {
                            return (
                                <li key={item.id} className={`${item.importance} ${styles["to-do-item"]}`} data-id={item.id}>
                                    <span className="pe-3">{item.content}{item.priority}</span>
                                    <span className="d-flex justify-content-between align-items-center"><i className={`far fa-edit ${styles.edit}`}></i><i className={`far fa-trash-alt ${styles.delete}`} onClick={handleDelete}></i><i className={`fas fa-chevron-circle-right ${styles.move}`}></i></span>
                                </li>
                            )
                        })
                    )}
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Todos