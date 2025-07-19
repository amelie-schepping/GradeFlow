import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AddClass() {
  const [className, setClassName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/Class", { name: className });
      navigate("/"); // zurück zum Dashboard
    } catch (err) {
      console.error("Fehler beim Erstellen der Klasse:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 px-6 py-8 bg-white dark:bg-muted rounded-xl shadow-sm border border-border">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Neue Klasse erstellen
      </h1>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="className">Klassenname</Label>
          <Input
            id="className"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="z. B. 10A"
            required
          />
        </div>

        <Button type="submit" className="w-full mt-2">
          Speichern
        </Button>
      </form>
    </div>
  );
}
