import Edittasks from "./Edittasks";
import Todolist from "./Todolist";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="top-center" pauseOnHover />
      <Router>
        <Routes>
          <Route path="/" element={<Todolist />} />
          <Route path="/tasks/edit/:id" element={<Edittasks />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
