import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
// import { ExcalidrawElementType } from "@excalidraw/excalidraw/dist/types/excalidraw/element/types";
// import { ExcalidrawElement } from "@excalidraw/excalidraw/dist/types/excalidraw/element/types";
// import type { AppState } from "@excalidraw/excalidraw/types";
import { useEffect, useState } from "react";

interface Props {
  filePath: string;
  width?: string;
  height?: string;
}

export default function ExcalidrawViewer({
  filePath,
  width = "100%",
  height = "600px",
}: Props) {
  const [drawingData, setDrawingData] = useState<{
    elements: any[]; // ExcalidrawElement[];
    appState?: any; // AppState;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDrawing = async () => {
      try {
        const response = await fetch(filePath);
        const data = await response.json();

        // Asegurarse de que los datos tengan el formato correcto
        if (data.elements) {
          setDrawingData({
            elements: data.elements,
            appState: {
              ...data.appState,
              viewBackgroundColor:
                data.appState?.viewBackgroundColor || "#ffffff",
              // Deshabilitar edición
              activeTool: {
                type: "hand",
                customType: null,
                locked: false,
              },
            },
          });
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
          width,
          height,
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
          width,
          height,
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
    <div
      style={{
        width,
        height,
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <Excalidraw
        initialData={{
          elements: drawingData.elements,
          appState: {
            ...drawingData.appState,
            // Configuración para solo visualización
            activeTool: {
              type: "hand",
              customType: null,
              locked: false,
            },
            // Permitir zoom con scroll
            zoom: {
              value: 1,
            },
            // Configurar estado inicial
            viewBackgroundColor: "#ffffff",
            currentItemStrokeColor: "#000000",
            currentItemBackgroundColor: "transparent",
            currentItemFillStyle: "hachure",
            currentItemStrokeWidth: 1,
            currentItemStrokeStyle: "solid",
            currentItemRoughness: 1,
            currentItemOpacity: 100,
            currentItemFont: 20,
            currentItemFontFamily: 1,
            currentItemTextAlign: "left",
            currentItemStartArrowhead: null,
            currentItemEndArrowhead: null,
            scrollX: 0,
            scrollY: 0,
            cursorButton: "up",
          },
        }}
        // Deshabilitar todas las funcionalidades de edición
        viewModeEnabled={false} // Importante: false para permitir zoom y movimiento
        zenModeEnabled={false}
        gridModeEnabled={false}
        UIOptions={{
          canvasActions: {
            // Habilitar solo las acciones de navegación
            clearCanvas: false,
            loadScene: false,
            saveToActiveFile: false,
            saveAsImage: true, // Permitir guardar como imagen
            toggleTheme: true,
            changeViewBackgroundColor: false,
          },
        }}
        // Deshabilitar menús innecesarios
        renderTopRightUI={() => null}
        // Configurar menú principal limitado
        renderCustomStats={() => null}
        // Controlar eventos para prevenir edición
        onPointerUpdate={(payload) => {
          // Puedes agregar lógica adicional aquí si es necesario
        }}
        // Manejar cambios (bloquear edición)
        onChange={(elements, appState, files) => {
          // Bloquear cualquier cambio en los elementos
          // No hacemos nada aquí para evitar que se guarden cambios
        }}
        // Bloquear herramientas de edición
        libraryReturnUrl={null}
        // Estilos personalizados
        theme="light"
        name="Excalidraw Drawing"
      />
    </div>
  );
}
