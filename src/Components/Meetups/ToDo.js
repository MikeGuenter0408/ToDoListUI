import classes from "./ToDo.module.css";
import BinImg from "../ui/BinImg";
import ToDoDisplay from "./ToDoDisplay";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

function ToDo(props) {
  const [inputVisible, setInputVisible] = useState(false);
  const toDoInputRef = useRef();
  const imgRef = useRef();
  let inputOrParagraph;

  // Update ToDo
  function PutToDo(updatedData) {
    fetch("https://localhost:5001/v1.0/Todolists/ToDos/" + props.id, {
      method: "PUT",
      body: JSON.stringify(updatedData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    props.shouldLoad(true);
  }

  // When enter was pressed while text-input active (Updating ToDo)
  function KeyHandler(event) {
    if (event.key === "Enter") {
      const enteredInput = toDoInputRef.current.value;
      const updatedToDo = {
        dueDateTime: "0001-01-01T00:00:00",
        description: enteredInput,
        toDoListId: props.toDoListId,
      };
      console.log(JSON.stringify(updatedToDo));
      PutToDo(updatedToDo);
      setInputVisible(false);
      props.shouldLoad();
    }
  }

  // Listens to all mouseclicks. When clicked outside of a changeable ToDo, the toDo becomes unchangeable again
  useEffect(() => {
    const handleMouseDown = (event) => {
      if (toDoInputRef.current) {
        if (!toDoInputRef.current.contains(event.target)) {
          setInputVisible(false);
        }
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  // Listens to all mouseclicks. When clicked onto the bin-img of a toDo, the toDo itself will be deleted
  useEffect(() => {
    const handleMouseDownBin = (event) => {
      if (imgRef.current) {
        if (imgRef.current.contains(event.target)) {
          props.deleteToDo(props.id);
        }
      }
    };
    document.addEventListener("mousedown", handleMouseDownBin);
    return () => {
      document.removeEventListener("mousedown", handleMouseDownBin);
    };
  }, [props]);

  useEffect(() => {
    if (toDoInputRef.current) {
      toDoInputRef.current.focus();
    }
  }, [inputVisible]);

  return (
    <li>
      <div className={classes.editItem}>
        {<ToDoDisplay
          inputVisible={inputVisible}
          setInputVisible={setInputVisible}
          description={props.description}
          toDoInputRef={toDoInputRef}
          KeyHandler={KeyHandler}
        ></ToDoDisplay>}
        {props.editPressed ? <BinImg imgRef={imgRef} /> : null}
      </div>
    </li>
  );
}

export default ToDo;
