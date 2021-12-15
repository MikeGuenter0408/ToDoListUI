import {Link} from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation(){
    return (
    <header className={classes.header}>
        <div className={classes.logo}>ToDoLists-Manager</div>
        <nav>
            <ul>
                <li>
                    <Link to="/">All ToDo Lists</Link>
                </li>
                <li>
                    <Link to="/addtodolist">Add ToDo List</Link>
                </li>
                <li>
                    <Link to="/favorites">My Favorites</Link>
                </li>   
            </ul>
        </nav>
    </header>
    );
}

export default MainNavigation;