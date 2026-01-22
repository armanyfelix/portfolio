import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
// import { ExcalidrawElementType } from "@excalidraw/excalidraw/dist/types/excalidraw/element/types";
// import btwFile from "../btw.excalidraw";
import "@excalidraw/excalidraw/index.css";
// import { ExcalidrawElement } from "@excalidraw/excalidraw/dist/types/excalidraw/element/types";
// import type { AppState } from "@excalidraw/excalidraw/types";
import { useEffect, useState } from "react";

interface Props {
  filePath?: string;
}

export default function ExcalidrawViewer({ filePath }: Props) {
  const [drawingData, setDrawingData] = useState<{
    elements: any[]; // ExcalidrawElement[];
    appState?: any; // AppState;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadDrawing = async () => {
      try {
        const response = await fetch("../btw.excalidraw");
        const data = await response.json();
        console.log(data);
        // Asegurarse de que los datos tengan el formato correcto
        if (data.elements) {
          setDrawingData(data);
        }
      } catch (error) {
        console.error("Error loading Excalidraw file:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDrawing();
  }, [filePath]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          background: "#f9fafb",
        }}
      >
        <div className="loading">Cargando dibujo...</div>
      </div>
    );
  }

  if (!drawingData) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #fecaca",
          borderRadius: "8px",
          background: "#fef2f2",
        }}
      >
        <div className="error">Error al cargar el dibujo</div>
      </div>
    );
  }

  return (
    <div className="h-125">
      <Excalidraw
        initialData={drawingData}
        viewModeEnabled={true}
        zenModeEnabled={false}
        // gridModeEnabled={false}
        theme="dark"
        name="What I use btw"
      />
    </div>
  );
}
