import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Student = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:8800/Student");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/Student/" + id);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Studentenliste</h1>

      <div className="grid gap-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">
                {student.firstName} {student.lastName}
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(student.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Löschen
              </button>
              <Link to={`/update/${student.id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Bearbeiten
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link to="/add">
          <button className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600">
            Neuen Studenten hinzufügen
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Student;
