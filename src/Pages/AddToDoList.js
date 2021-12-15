import NewToDoListForm from "../Components/Meetups/NewToDoListForm";
import { useNavigate } from "react-router-dom";

function AddToDoList(){
    const history = useNavigate();

    // Post a ToDo-List
    function addToDoListHandler(toDoListData){
        fetch(
            "https://localhost:5001/v1.0/Todolists",
            {
                method: "POST", 
                body: JSON.stringify(toDoListData),
                headers:{
                    Accept: "application/json",
                    "Content-Type": "application/json; charset=utf-8",
                }
            }
        ).then(()=>{history("/")});
    }

    return <section>
        <h1>Add New ToDo List</h1>
        <NewToDoListForm onAddToDoList={addToDoListHandler}/>
    </section>;
}

export default AddToDoList;