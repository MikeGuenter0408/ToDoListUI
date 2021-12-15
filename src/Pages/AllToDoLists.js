import ToDoListList from "../Components/Meetups/ToDoList-List";
import { useState } from "react";
import { useEffect } from "react";

function AllToDoLists() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedToDoLists, setLoadedToDoLists] = useState([]);
  const [shouldLoad, setShouldLoad] = useState();

  //Fetch all ToDoLists from the API/Database
  useEffect(() => {
    setIsLoading(true);
    fetch("https://localhost:5001/v1.0/Todolists")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const toDoLists = [];
        for (const key in data) {
          const toDoList = {
            id: data[key].id,
            name: data[key].name,
            toDos: data[key].toDos,
          };
          toDoLists.push(toDoList);
        }
        setIsLoading(false);
        setLoadedToDoLists(toDoLists);
      });

    setShouldLoad(false);
  }, [shouldLoad]);

  return (
    <section>
      <h1>All ToDo Lists</h1>
      <ToDoListList toDoLists={loadedToDoLists} shouldLoad={setShouldLoad} />
    </section>
  );
}

export default AllToDoLists;
