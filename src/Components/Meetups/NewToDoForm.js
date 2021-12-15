import { useEffect, useRef } from "react";

function NewToDoForm(props) {
  let isRendered = props.isEnabled;
  const toDoInputRef = useRef();

  // Post a ToDo
  function PostToDo(toDoData) {
    fetch("https://localhost:5001/v1.0/Todolists/ToDos", {
      method: "POST",
      body: JSON.stringify(toDoData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  }

  // Call when Enter was pressed while text input is active
  function KeyHandler(event) {
    if (event.key === "Enter") {
      const enteredInput = toDoInputRef.current.value;
      const newToDo = {
        dueDateTime: "0001-01-01T00:00:00",
        description: enteredInput,
        toDoListId: props.toDoListId,
      };
      PostToDo(newToDo);
      props.setIsRendered(false);
      console.log(JSON.stringify(newToDo));
      props.shouldLoad(true);
    }
  } 

  // Call when text input is visible -> You can start typing immediately after pressing "Add ToDo"
  useEffect(()=>{
    if(toDoInputRef.current){
      toDoInputRef.current.focus();
    }
  }, [isRendered])

  if (isRendered) {
    return (
      <ul>
        <li>
          <input
            onKeyPress={KeyHandler}
            ref={toDoInputRef}
            type="text"
            required id="name"
          ></input>
        </li>
      </ul>
    );
    
  } else {
    return null;
  }
}

export default NewToDoForm;
