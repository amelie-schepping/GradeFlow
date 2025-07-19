import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function UpdateStudent() {
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    class: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const studentId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/Student/${studentId}`
        );

        setStudent({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          class: res.data.class_id,
        });
      } catch (err) {
        console.error("Fehler beim Laden des Studenten:", err);
      }
    };
    fetchStudent();
  }, [studentId]);

  const handleChange = (e) => {
    setStudent((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/Student/${studentId}`, {
        ...student,
        class_id: student.class,
      });
      navigate(`/class/${student.class}`); //
    } catch (err) {
      console.error("Fehler beim Aktualisieren des Studenten:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 px-6 py-8 bg-white dark:bg-muted rounded-xl shadow-sm border border-border">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Schüler*in bearbeiten
      </h1>

      <form className="space-y-5" onSubmit={handleClick}>
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

        <div className="grid gap-2">
          <Label htmlFor="class">Klasse</Label>
          <Input
            id="class"
            name="class"
            type="number"
            value={student.class}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className="w-full mt-2">
          Aktualisieren
        </Button>
      </form>
    </div>
  );
}
