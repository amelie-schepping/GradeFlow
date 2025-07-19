import { BrowserRouter, Routes, Route } from "react-router-dom";
import Student from "@/pages/Student";
import Home from "./pages/Home";
import AddClass from "./pages/AddClass";
import UpdateStudent from "./pages/UpdateStudent";
import AddStudent from "./pages/AddStudent";
function App() {
  return (
    <div className="p-4">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/class/:classId" element={<Student />} />
          <Route path="/update/:id" element={<UpdateStudent />} />
          <Route path="/class/:classId/add" element={<AddStudent />} />

          <Route path="/class/add" element={<AddClass />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
