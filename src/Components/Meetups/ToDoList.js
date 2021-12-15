import classes from "./ToDoList.module.css";
import Card from "../ui/Card";
import NewToDoForm from "./NewToDoForm";
import ToDo from "./ToDo";
import BinImg from "../ui/BinImg"
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

function ToDoListItem(props) {
  const [isRendered, setIsRendered] = useState(false);
  const [editPressed, setEditPressed] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);
  const imgRef = useRef();
  const newToDoRef = useRef();
  const toDoListInputRef = useRef();
  let content;
  let h3OrInput;

  // Call when "AddToDo" Button was clicked
  function NewToDoHandler(event) {
    event.preventDefault();
    if (isRendered) {
      setIsRendered(false);
    } else {
      setIsRendered(true);
    }
  }

  // Call when "Edit" Button was clicked
  function EditHandler(event) {
    event.preventDefault();
    if (editPressed) {
      setEditPressed(false);
    } else {
      setEditPressed(true);
    }
  }

  // Call when bin-img was clicked (Indirectly from useEffect below)
  function DeleteToDoHandler(toDoId) {
    fetch("https://localhost:5001/v1.0/Todolists/Todos/" + toDoId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    props.shouldLoad(true);
  }

  // Listens to every single mouseclick. As soon as mouseclick was on bin-img, call deleteToDoList
  useEffect(() => {
    const handleMouseDownListBin = (event) => {
      if (imgRef.current) {
        if (imgRef.current.contains(event.target)) {
          props.deleteToDoList(props.toDoListId);
        }
      }
    };
    document.addEventListener("mousedown", handleMouseDownListBin);
    return () => {
      document.removeEventListener("mousedown", handleMouseDownListBin);
    };
  }, [props]);

  // Listens to all mouseclicks. When clicked onto a ToDoList Title, the toDoList Title becomes changeable
  useEffect(() => {
    const handleMouseDown = (event) => {
      if (toDoListInputRef.current) {
        if (!toDoListInputRef.current.contains(event.target)) {
          setInputVisible(false);
        }
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  // When enter was pressed while text-input active (Updating ToDoList Title)
  function KeyHandler(event) {
    if (event.key === "Enter") {
      const enteredInput = toDoListInputRef.current.value;
      const updatedToDoList = {
        name: enteredInput,
        toDoListId: props.toDoListId,
        key: props.id,
        toDos: props.toDos
      };
      console.log(JSON.stringify(updatedToDoList));
      PutToDoList(updatedToDoList);
      setInputVisible(false);
      props.shouldLoad();
    }
  }

  // Update ToDoList
  function PutToDoList(updatedData) {
    fetch("https://localhost:5001/v1.0/Todolists/" + props.toDoListId, {
      method: "PUT",
      body: JSON.stringify(updatedData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    props.shouldLoad(true);
  }

  // When input is visible then focus the input
  useEffect(()=>{
    if(toDoListInputRef.current){
      toDoListInputRef.current.focus();
    }
  }, [inputVisible])

  if(inputVisible){
    h3OrInput = (
      <input 
        className={classes.ToDoListInput}
        defaultValue={props.name}
        ref={toDoListInputRef}
        onKeyPress={KeyHandler}
      ></input>
    );
  }
  else{
    h3OrInput = <h3 onClick={setInputVisible}>{props.name}</h3>;
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <div className={classes.editItem}>
            {h3OrInput}
            {editPressed ? (<BinImg imgRef={imgRef}/>) : null}
          </div>
          <div className={classes.toDos}>
            <ul>
              {props.toDos.map((toDo) => (
                <ToDo
                  key={toDo.id}
                  id={toDo.id}
                  description={toDo.description}
                  shouldLoad={props.shouldLoad}
                  toDoListId={props.toDoListId}
                  deleteToDo={DeleteToDoHandler}
                  editPressed={editPressed}
                />
              ))}
            </ul>
            <NewToDoForm
              isEnabled={isRendered}
              setIsRendered={setIsRendered}
              shouldLoad={props.shouldLoad}
              toDoListId={props.toDoListId}
            />
          </div>
        </div>
        <div className={classes.flex}>
          <div className={classes.actions}>
            <button>To Favorites</button>
          </div>
          <form onSubmit={NewToDoHandler} ref={newToDoRef}>
            <div className={classes.actions}>
              <button type="submit">Add ToDo</button>
            </div>
          </form>
          <form onSubmit={EditHandler}>
            <div className={classes.actions}>
              <button type="submit">Edit</button>
            </div>
          </form>
        </div>
      </Card>
    </li>
  );
}

export default ToDoListItem;
