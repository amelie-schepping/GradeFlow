import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

export default function Home() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:8800/Class");
        setClasses(response.data);
      } catch (error) {
        console.error("Fehler beim Laden der Klassen:", error);
      }
    };
    fetchClasses();
  }, []);

  return (
    <Layout>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Dashboard
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {classes.map((klasse) => (
          <Link key={klasse.id} to={`/class/${klasse.id}`}>
            <Card className="h-40 flex items-center justify-center cursor-pointer hover:bg-muted transition">
              <CardContent className="text-center">
                <p className="text-xl font-semibold break-words">
                  {klasse.name}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}

        <Link to="/class/add">
          <Card className="h-40 flex items-center justify-center cursor-pointer border-dashed border-2 hover:shadow-md transition">
            <CardContent className="flex flex-col items-center justify-center">
              <Plus className="w-10 h-10 stroke-[1.5]" />
            </CardContent>
          </Card>
        </Link>
      </div>
    </Layout>
  );
}
