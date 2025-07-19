import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import Layout from "@/components/Layout";

export default function Student() {
  const { classId } = useParams(); // 🆕 classId aus URL
  const [students, setStudents] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const [className, setClassName] = useState("");

  useEffect(() => {
    const fetchClassName = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/Class/${classId}`);
        setClassName(res.data.name); // z. B. "10B"
      } catch (err) {
        console.error("Fehler beim Laden der Klasse:", err);
      }
    };

    fetchClassName();
  }, [classId]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/Student/class/${classId}`
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Fehler beim Laden der Daten:", error);
      }
    };
    fetchStudents();
  }, [classId]);

  const confirmDelete = (student) => {
    setStudentToDelete(student);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!studentToDelete) return;
    try {
      await axios.delete(`http://localhost:8800/Student/${studentToDelete.id}`);
      setStudents((prev) => prev.filter((s) => s.id !== studentToDelete.id));
      setDeleteDialogOpen(false);
      setStudentToDelete(null);
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {className || classId}
        </h4>

        {students.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              Noch keine Schüler*innen in dieser Klasse vorhanden.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {students.map((student) => (
              <Card key={student.id}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium">
                      {student.firstName} {student.lastName}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      onClick={() => confirmDelete(student)}>
                      Entfernen
                    </Button>
                    <Link to={`/update/${student.id}`}>
                      <Button variant="outline">Bearbeiten</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center pt-6">
          <Link to={`/class/${classId}/add`}>
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Neuen Schüler*in hinzufügen
            </Button>
          </Link>
        </div>

        {/* Bestätigungsdialog für das Löschen */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Möchtest du diese*n Schüler*in wirklich löschen?
              </DialogTitle>
            </DialogHeader>
            <div className="py-2">
              <p>
                {studentToDelete?.firstName} {studentToDelete?.lastName}
              </p>
            </div>
            <DialogFooter className="pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setDeleteDialogOpen(false);
                  setStudentToDelete(null);
                }}>
                Abbrechen
              </Button>
              <Button variant="destructive" onClick={handleDeleteConfirmed}>
                Entfernen
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>{" "}
    </Layout>
  );
}
