import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    class_id: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const studentId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setStudent((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put("http://localhost:8800/Student/" + studentId, student);
      alert("Student added successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error adding student:", err);
    }
  };

  console.log(student);

  return (
    <div className="form">
      <h1>Update Student</h1>
      <input
        type="text"
        placeholder="firstName"
        onChange={handleChange}
        name="firstName"
      />
      <input
        type="text"
        placeholder="lastName"
        onChange={handleChange}
        name="lastName"
      />
      <input
        type="number"
        placeholder="class"
        onChange={handleChange}
        name="class_id"
      />

      <button onClick={handleClick}>Update</button>
    </div>
  );
};

export default Update;
