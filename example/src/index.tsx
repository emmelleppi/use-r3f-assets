import React, { Suspense, useState } from 'react'
import { render } from "react-dom";
import { Canvas } from 'react-three-fiber'
import { OrbitControls } from 'drei'

import "./index.css";
import Scene from "./Scene";



function App() {
  const [stop, setStop] = useState<boolean>(false)

  return (
    <Canvas camera={{ position: [0, 0, 2] }} onPointerDown={() => setStop(true)} onPointerUp={() => setStop(false)}>
      <Suspense fallback={null}>
        <Scene stop={stop} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);