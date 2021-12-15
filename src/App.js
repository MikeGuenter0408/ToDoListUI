import { Route, Routes } from "react-router-dom";
import AllToDoListsPage from "./Pages/AllToDoLists";
import NewToDoListPage from "./Pages/AddToDoList";
import FavoritesPage from "./Pages/Favorites";
import Layout from "./Components/layouts/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllToDoListsPage />} />
        <Route path="/addtodolist" element={<NewToDoListPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
