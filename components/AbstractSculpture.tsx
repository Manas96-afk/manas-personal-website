'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial, PerspectiveCamera, SpotLight, useScroll } from '@react-three/drei';
import { useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { motion } from 'motion/react';

function Sculpture({ scrollY }: { scrollY: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.SpotLight>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Slow, cinematic rotation
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;

    // Scroll interaction
    // As user scrolls down, the object rotates slightly faster or changes orientation
    const scrollFactor = Math.min(scrollY / window.innerHeight, 1);

    meshRef.current.rotation.z = scrollFactor * Math.PI * 0.5;

    // Light movement based on scroll
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 5;
      lightRef.current.position.z = Math.cos(state.clock.getElapsedTime() * 0.5) * 5 + 5;

      // Start very dark (0.2), reveal as you scroll
      lightRef.current.intensity = 0.2 + scrollFactor * 8;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group>
        {/* Inner Core - The "Mind" / Neural glow */}
        <mesh ref={meshRef} scale={1.8}>
          <torusKnotGeometry args={[1, 0.3, 200, 32]} />
          {/* Car Paint Material - Dark, sleek, reflective */}
          <meshPhysicalMaterial
            color="#050505"
            roughness={0.2}
            metalness={0.8}
            clearcoat={1}
            clearcoatRoughness={0.1}
            emissive="#000000"
          />
        </mesh>

        {/* Outer Wireframe - The "Structure" / Neural Lines */}
        <mesh scale={1.85}>
          <torusKnotGeometry args={[1, 0.3, 200, 32]} />
          <meshStandardMaterial
            color="#10b981" // Emerald
            emissive="#10b981"
            emissiveIntensity={1.5} // Stronger glow in dark
            wireframe
            transparent
            opacity={0.1} // More subtle lines
          />
        </mesh>

        {/* Dynamic Light */}
        <spotLight
          ref={lightRef}
          position={[5, 5, 5]}
          angle={0.5}
          penumbra={1}
          intensity={0} // Start off
          color="#ffffff"
          castShadow
        />

        {/* Ambient Fill - Very low to keep it dark initially */}
        <ambientLight intensity={0.05} />
      </group>
    </Float>
  );
}

export default function AbstractSculpture() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
        <Suspense fallback={null}>
          <Sculpture scrollY={scrollY} />
          <Environment preset="city" />
        </Suspense>

        {/* Post-processing effects could be added here for bloom, but keeping it simple for performance */}
      </Canvas>

      {/* Overlay gradient to fade it out at the bottom if needed */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
    </div>
  );
}
