'use client';

import { useRef, useLayoutEffect, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, ContactShadows, Float } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* 
  NOTE: The user requested to load a GLB model from /public/models/bmw.glb.
  Since that file does not exist in this environment, I am using a procedural 
  BMW-inspired mesh as a fallback. 
  
  To use the real GLB:
  1. Place your 'bmw.glb' in the 'public/models/' folder.
  2. Uncomment the 'useGLTF' hook in the Model component.
  3. Replace the <group>...</group> with <primitive object={scene} ... />
*/

function BMWModel({ innerRef }: { innerRef: React.RefObject<THREE.Group | null> }) {
  // const { scene } = useGLTF('/models/bmw.glb'); // UNCOMMENT THIS TO LOAD GLB

  // --- Procedural Fallback Mesh (Apple-style sleekness) ---
  const paintMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#9ca3af", // Cool grey (Apple-like)
    metalness: 0.7,
    roughness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.5,
  }), []);

  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#111",
    metalness: 0.9,
    roughness: 0.1,
    transmission: 0.2,
    transparent: true
  }), []);

  const accentMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#ff3b30", // Apple-style red
    emissive: "#ff3b30",
    emissiveIntensity: 0.5,
    toneMapped: false
  }), []);

  return (
    <group ref={innerRef}>
      {/* If using GLB, replace the children below with: <primitive object={scene} /> */}
      
      {/* --- Body --- */}
      <mesh position={[0, 0.5, 0]} material={paintMaterial}>
        <boxGeometry args={[2, 0.55, 4.6]} />
      </mesh>
      
      {/* Cabin */}
      <mesh position={[0, 1.05, -0.3]} material={glassMaterial}>
        <boxGeometry args={[1.6, 0.65, 2.4]} />
      </mesh>
      
      {/* Hood */}
      <mesh position={[0, 0.8, 1.5]} rotation={[0.12, 0, 0]} material={paintMaterial}>
        <boxGeometry args={[1.85, 0.08, 1.9]} />
      </mesh>

      {/* Trunk */}
      <mesh position={[0, 0.9, -2.1]} rotation={[-0.1, 0, 0]} material={paintMaterial}>
        <boxGeometry args={[1.85, 0.2, 0.8]} />
      </mesh>

      {/* Wheels */}
      <Wheel position={[-1.05, 0.35, 1.4]} />
      <Wheel position={[1.05, 0.35, 1.4]} />
      <Wheel position={[-1.05, 0.36, -1.4]} scale={1.05} />
      <Wheel position={[1.05, 0.36, -1.4]} scale={1.05} />
      
      {/* Accents */}
      <mesh position={[0, 0.5, 2.31]} material={accentMaterial}>
         <boxGeometry args={[0.8, 0.2, 0.05]} />
      </mesh>
    </group>
  );
}

function Wheel({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
  return (
    <group position={position} rotation={[0, 0, Math.PI / 2]} scale={scale}>
      <mesh>
        <cylinderGeometry args={[0.34, 0.34, 0.25, 32]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.13, 0]}>
         <cylinderGeometry args={[0.22, 0.22, 0.05, 16]} />
         <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function Scene() {
  const modelRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  useLayoutEffect(() => {
    // GSAP ScrollTrigger Logic
    // We need to target the DOM element that wraps the canvas or the section
    // Since this component is inside the Canvas, we can't directly access DOM outside easily without context
    // BUT, we can use ScrollTrigger.create() and link it to the page scroll
    
    if (!modelRef.current) return;

    const ctx = gsap.context(() => {
      // Rotate the model 360 degrees (2 * PI) as we scroll through the trigger section
      gsap.to(modelRef.current!.rotation, {
        y: Math.PI * 2,
        ease: "none",
        scrollTrigger: {
          trigger: "#car-showcase-section", // ID of the section in the parent page
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
      
      // Optional: Slight tilt based on scroll
      gsap.to(modelRef.current!.rotation, {
        x: 0.1,
        scrollTrigger: {
          trigger: "#car-showcase-section",
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={2} castShadow />
      <Environment preset="studio" />
      
      <group position={[0, -0.5, 0]} scale={isMobile ? 0.8 : 1.2}>
        <BMWModel innerRef={modelRef} />
        <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
      </group>
    </>
  );
}

export default function AppleCar() {
  return (
    <div id="car-showcase-section" className="relative h-[200vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 2, 6], fov: 45 }}
          gl={{ alpha: true, antialias: true }}
          className="w-full h-full"
        >
          <Scene />
        </Canvas>
        
        {/* Overlay Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center mix-blend-difference">
          <h2 className="text-[10vw] font-bold tracking-tighter text-white opacity-10">
            ULTIMATE
          </h2>
        </div>
      </div>
    </div>
  );
}
