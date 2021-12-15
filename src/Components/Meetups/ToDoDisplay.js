function ToDoDisplay(props) {
  let inputOrParagraph;
  let inputVisible = props.inputVisible;

  if (inputVisible) {
    inputOrParagraph = (
      <input
        defaultValue={props.description}
        ref={props.toDoInputRef}
        onKeyPress={props.KeyHandler}
      ></input>
    );
  } else {
    inputOrParagraph = (
      <p onClick={props.setInputVisible}>{props.description}</p>
    );
  }

  return <div>{inputOrParagraph}</div>;
}

export default ToDoDisplay;
