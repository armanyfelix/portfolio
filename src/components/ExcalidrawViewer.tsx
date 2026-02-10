import { Excalidraw } from "@excalidraw/excalidraw";
import type { ExcalidrawElement } from "@excalidraw/excalidraw/dist/types/excalidraw/element/types";
import type { AppState } from "@excalidraw/excalidraw/dist/types/excalidraw/types";
import "@excalidraw/excalidraw/index.css";
import { Suspense, useEffect, useState } from "react";

interface Props {
	filePath: string;
}

export default function ExcalidrawViewer({ filePath }: Props) {
	const [drawingData, setDrawingData] = useState<{
		elements: ExcalidrawElement[];
		appState?: AppState;
	} | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadDrawing = async () => {
			try {
				const response = await fetch(filePath);
				const data = await response.json();
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
			<div className="alert alert-soft">
				<span className="loading loading-dots loading-lg"></span>
				Cargando Excalidraw...
			</div>
		);
	}

	if (!drawingData) {
		return <div className="alert alert-warning">Error loading Excalidraw</div>;
	}

	return (
		<div className="h-200">
			<Suspense
				fallback={
					<div className="alert alert-soft">
						<span className="loading loading-dots loading-lg"></span>
						Cargando Excalidraw...
					</div>
				}
			>
				<Excalidraw
					initialData={drawingData}
					viewModeEnabled={true}
					// zenModeEnabled={false}
					// gridModeEnabled={false}
					theme="dark"
					name="What I use btw"
				/>
			</Suspense>
		</div>
	);
}
