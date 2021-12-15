import Card from "../ui/Card";
import classes from "./NewToDoListForm.module.css";
import { useRef } from "react";

function NewToDoListForm(props){
    const NameInputRef = useRef();

    // Call when Add ToDo List Button was pressed
    function submitHandler(event){
        event.preventDefault();
        const enteredName = NameInputRef.current.value;
    
        const ToDoListData={
            name: enteredName,
            toDos:  [
            ]
        };

        props.onAddToDoList(ToDoListData);
    }

    return (
    <Card>
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor="name">ToDo List Title</label>
                <input type="text" required id="name" ref={NameInputRef}/>
            </div>
            <div className={classes.actions}>
                <button>Add ToDo List</button>
            </div>
        </form>
    </Card>
    );
}

export default NewToDoListForm;