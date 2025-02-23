import useSpline from '@splinetool/r3f-spline'
import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { PerspectiveCamera, OrthographicCamera } from '@react-three/drei'

export default function Scene({ ...props }) {
  const { nodes, materials } = useSpline('https://prod.spline.design/W12dfzkpb9P-uOdm/scene.splinecode')
  
  const skullRef = useRef()
  const liquidsRefs = useRef([])

  useFrame(({ mouse, clock }) => {
    // Skull rotation following mouse
    if (skullRef.current) {
      const targetRotationY = (mouse.x * Math.PI) / 4 // Increased sensitivity
      const targetRotationX = (-mouse.y * Math.PI) / 4
      
      skullRef.current.rotation.y = THREE.MathUtils.lerp(
        skullRef.current.rotation.y,
        targetRotationY + 0.57,
        0.1
      )
      skullRef.current.rotation.x = THREE.MathUtils.lerp(
        skullRef.current.rotation.x,
        targetRotationX - 0.22,
        0.1
      )
    }

    // Liquid distortion animation
    const t = clock.getElapsedTime()
    liquidsRefs.current.forEach((liquid, i) => {
      if (liquid) {
        // More pronounced liquid distortion
        liquid.position.y = Math.sin(t * 1.5 + i) * 0.3
        liquid.scale.y = 1 + Math.sin(t * 2 + i) * 0.01
      }
    })
  })

  return (
    <>
      <color attach="background" args={['#050508']} />
      <OrbitControls 
        enableZoom={true} 
        enableRotate={true}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
      />

      {/* Restore original purple point light with increased intensity */}
      <pointLight
        intensity={12000.30} // Increased from 1000
        position={[39.70, 1.49, 127]}
        color="#A806B7" // Changed back to purple
        distance={10000}
        decay={0}
      />

      {/* Adjust spot light for better highlights */}
      <spotLight
        intensity={15000.48} // Increased from 20
        position={[1042.88, 1041.33, 931.53]}
        angle={89}
        penumbra={0.5}
        decay={1}
        color="#76EFFF"
        distance={5828}
        castShadow
      />

      <group {...props} position={[0, 0, 0]} scale={0.7} dispose={null}>
        <scene name="Scene 1">
          <PerspectiveCamera
            name="Camera"
            makeDefault={true}
            far={100000}
            near={70}
            fov={45}
            position={[28.54, -9.51, 1507.34]}
          />

          <group ref={skullRef} name="Skull" position={[0, 0, 0]} rotation={[-0.22, 0.57, 0.1]} scale={1}>
            <group name="Jaw Animation" position={[0, 47.51, -8.62]}>
              <group name="jaw" position={[2.29, -256.68, 88.04]} rotation={[-0.7, 0, 0]} scale={1}>
                <mesh
                  name="jaw-lowpoly"
                  geometry={nodes['jaw-lowpoly'].geometry}
                  material={materials.Skull} // Use Hedron's material
                  castShadow
                  receiveShadow
                  position={[8.81, -133.75, 103.75]}
                  rotation={[0, 0, 0]}
                  scale={3.44}
                />
                <mesh
                  name="teeth-bottom-lowpoly"
                  geometry={nodes['teeth-bottom-lowpoly'].geometry}
                  material={materials.Skull} // Use Hedron's material
                  castShadow
                  receiveShadow
                  position={[7.8, -169.99, 160.5]}
                  rotation={[0, 0, 0]}
                  scale={1.44}
                />
              </group>
              <group name="Skull1" position={[0, 58.28, 8.62]}>
                <mesh
                  name="skull-lowpoly"
                  geometry={nodes['skull-lowpoly'].geometry}
                  material={materials.Skull} // Use Hedron's material
                  castShadow
                  receiveShadow
                  position={[-26.06, -87.3, 238.13]}
                  rotation={[0, 0, 0]}
                  scale={5.87}
                />
                <mesh
                  name="teeth-top-lowpoly"
                  geometry={nodes['teeth-top-lowpoly'].geometry}
                  material={materials.Skull} // Use Hedron's material
                  castShadow
                  receiveShadow
                  position={[-1.58, -297.97, 313.72]}
                  rotation={[0, 0, 0]}
                  scale={0.6}
                />
              </group>
            </group>
          </group>

          <group name="Graphic" position={[267, -100.3, 0]}>
            <mesh
              name="Graphic1"
              geometry={nodes.Graphic1.geometry}
              material={materials.Text}
              castShadow
              receiveShadow
              position={[-1034.08, 129.38, 0]}
              rotation={[0, 0, -Math.PI]}
              scale={0.71}
            />
            <mesh
              name="Graphic2"
              geometry={nodes.Graphic2.geometry}
              material={materials.Text}
              castShadow
              receiveShadow
              position={[526.46, 634.81, 0]}
            />
            <mesh
              name="Graphic3"
              geometry={nodes.Graphic3.geometry}
              material={materials.Text}
              castShadow
              receiveShadow
              position={[415.33, -533.08, 0]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[-0.56, 0.56, 0.56]}
            />
            <mesh
              name="Graphic4"
              geometry={nodes.Graphic4.geometry}
              material={materials.Text}
              castShadow
              receiveShadow
              position={[-1188.82, 908, 0]}
              scale={0.56}
            />
          </group>

          <group name="Hedrons" position={[-59.38, 102.62, 142.22]}>
            <mesh
              name="Hedron"
              geometry={nodes.Hedron.geometry}
              material={materials.Skull}
              castShadow
              receiveShadow
              position={[-564.33, 389.82, -314.02]}
              rotation={[0, 0, -0.71]}
              scale={0.77}
            />
            <mesh
              name="Hedron1"
              geometry={nodes.Hedron1.geometry}
              material={materials.Skull}
              castShadow
              receiveShadow
              position={[621.55, -447.04, 72.64]}
              scale={0.36}
            />
            <mesh
              name="Hedron2"
              geometry={nodes.Hedron2.geometry}
              material={materials.Skull}
              castShadow
              receiveShadow
              position={[-369.98, -228.96, 336.86]}
              rotation={[0, 0, 0.9]}
              scale={0.48}
            />
            <mesh
              name="Hedron3"
              geometry={nodes.Hedron3.geometry}
              material={materials.Skull}
              castShadow
              receiveShadow
              position={[506.71, 104.88, -27.15]}
              rotation={[0, -0.74, 0]}
              scale={0.36}
            />
          </group>

          {/* Add back Glass group */}
          <group name="Glass" position={[54.11, -3.8, 726]}>
            <mesh
              name="Glass1"
              geometry={nodes.Glass1.geometry}
              material={materials.Glass}
              castShadow
              receiveShadow
              position={[-252.91, -184.98, 0]}
              rotation={[1.21, 0.1, -0.7]}
              scale={1.25}
            />
            <mesh
              name="Glass2"
              geometry={nodes.Glass2.geometry}
              material={materials.Glass}
              castShadow
              receiveShadow
              position={[-130.92, 212.57, 11.96]}
              rotation={[1.38, 0.16, -0.58]}
              scale={1}
            />
            <mesh
              name="Glass3"
              geometry={nodes.Glass3.geometry}
              material={materials.Glass}
              castShadow
              receiveShadow
              position={[267.86, -48.29, 8.62]}
              rotation={[1.51, -0.22, 0.83]}
              scale={1}
            />
          </group>

          <group name="Liquids" position={[78.37, 95.97, 157.08]}>
            <mesh
              name="Liquid"
              geometry={nodes.Liquid.geometry}
              material={materials['Liquid Material']}
              castShadow
              receiveShadow
              position={[291.78, 65.44, -347.24]}
              rotation={[2.6, 0.18, -2.04]}
              scale={1.11}
            />
            <mesh
              name="Liquid1"
              geometry={nodes.Liquid1.geometry}
              material={materials['Liquid1 Material']}
              castShadow
              receiveShadow
              position={[-224.43, -347.91, -593.89]}
              rotation={[0.58, 0.46, 0.9]}
              scale={1.3}
            />
            <mesh
              name="Liquid2"
              geometry={nodes.Liquid2.geometry}
              material={materials['']}
              castShadow
              receiveShadow
              position={[-320.32, -262.15, 251.87]}
              rotation={[1.88, 1.13, -2.46]}
              scale={0.88}
            />
            <mesh
              name="Liquid3"
              geometry={nodes.Liquid3.geometry}
              material={materials['']}
              castShadow
              receiveShadow
              position={[283.8, -374.42, -55.7]}
              rotation={[-1.71, -0.06, -2.79]}
              scale={0.74}
            />
            <mesh
              name="Liquid4"
              geometry={nodes.Liquid4.geometry}
              material={materials['']}
              castShadow
              receiveShadow
              position={[-376.2, 264.09, -377.02]}
              rotation={[0.99, -0.17, -0.82]}
              scale={1.23}
            />
            <mesh
              name="Liquid5"
              geometry={nodes.Liquid5.geometry}
              material={materials['']}
              castShadow
              receiveShadow
              position={[426.41, -178.46, 474.33]}
              rotation={[3.06, -0.83, 2.08]}
              scale={0.87}
            />
          </group>
          <OrthographicCamera name="1" makeDefault={false} far={100000} near={-100000} />
        </scene>
      </group>
    </>
  )
}
