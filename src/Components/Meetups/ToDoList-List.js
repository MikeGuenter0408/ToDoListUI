import classes from "./ToDoList-List.module.css";
import ToDoList from "./ToDoList";

function ToDoListList(props) {
  //Call when bin-img (from child "ToDoList.js") was clicked
  function deleteToDoList(listId) {
    fetch("https://localhost:5001/v1.0/Todolists/" + listId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    props.shouldLoad();
  }

  return (
    <ul className={classes.list}>
      {props.toDoLists.map((toDoList) => (
        <ToDoList
          key={toDoList.id}
          toDoListId={toDoList.id}
          name={toDoList.name}
          toDos={toDoList.toDos}
          shouldLoad={props.shouldLoad}
          deleteToDoList={deleteToDoList}
        />
      ))}
    </ul>
  );
}

export default ToDoListList;
