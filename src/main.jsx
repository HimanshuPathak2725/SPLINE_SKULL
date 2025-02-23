import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ 
        position: [0, 0, 1800],
        fov: 45,
        near: 1,
        far: 100000
      }}
      gl={{ 
        preserveDrawingBuffer: true,
        antialias: true,
      }}
    >
      <Scene />
    </Canvas>
  </StrictMode>
)
