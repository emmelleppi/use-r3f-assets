import React, { Suspense, useState } from "react";
import { render } from "react-dom";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "drei";

import "./index.css";
import Scene from "./Scene";

function App() {
  const [stop, setStop] = useState<boolean>(false);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <Canvas
      pixelRatio={Math.min(2, isMobile ? window.devicePixelRatio : 1)}
      camera={{ position: [0, 0, 2] }}
      onPointerDown={() => setStop(true)}
      onPointerUp={() => setStop(false)}
    >
      <Suspense fallback={null}>
        <Scene stop={stop} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
