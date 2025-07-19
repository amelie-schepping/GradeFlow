import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AddStudent() {
  const navigate = useNavigate();
  const location = useLocation();
  const classId = location.pathname.split("/")[2]; // z.B. "/class/5/add" → "5"

  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    setStudent((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/Student", {
        ...student,
        class_id: classId,
      });
      navigate(`/class/${classId}`);
    } catch (err) {
      console.error("Fehler beim Hinzufügen des Studenten:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 px-6 py-8 bg-white dark:bg-muted rounded-xl shadow-sm border border-border">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Schüler*in zur Klasse {classId} hinzufügen
      </h1>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="firstName">Vorname</Label>
          <Input
            id="firstName"
            name="firstName"
            value={student.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="lastName">Nachname</Label>
          <Input
            id="lastName"
            name="lastName"
            value={student.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className="w-full mt-2">
          Hinzufügen
        </Button>
      </form>
    </div>
  );
}
