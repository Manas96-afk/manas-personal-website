"use client";

import React, { useRef, useLayoutEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// --- BMW Model Component ---
// This component attempts to load the model.
// If the file is missing, it will throw an error (caught by ErrorBoundary or Suspense fallback).
function BmwModel({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const headlightsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  
  // Attempt to load the model. 
  // In a real scenario, ensure /models/bmw.glb exists in public folder.
  const { scene, materials } = useGLTF("/models/bmw.glb");

  // Setup references for animation
  useLayoutEffect(() => {
    if (scene) {
      // Traverse to find headlights or specific parts
      scene.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          // Identify headlights by name or material name
          // Adjust these names based on your actual GLB file
          if (child.name.includes("headlight") || child.material.name.includes("light")) {
             // Store material ref for animation
             // We clone to avoid modifying shared material if needed
             // child.material = child.material.clone();
             // headlightsRef.current.push(child.material);
          }
        }
      });
    }
  }, [scene]);

  // GSAP Animation Logic
  useGSAP(() => {
    if (!group.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // Smooth scrubbing
      },
    });

    // PHASE 1: Hero Reveal (0% - 25%)
    // Headlights fade in, car moves slightly forward
    tl.to(group.current.position, {
      z: 0, // Move closer
      duration: 2,
      ease: "power2.inOut",
    }, 0);
    
    // Animate headlight intensity (simulated via emissive or opacity)
    // Since we don't have exact material refs, we'll animate a spotlight intensity instead
    
    // PHASE 2: Front Presence (25% - 50%)
    // Slight rotation to show profile, move camera/group
    tl.to(group.current.rotation, {
      y: Math.PI / 8, // Slight turn, NOT a spin
      duration: 2,
      ease: "power1.inOut",
    }, 2);

    tl.to(group.current.position, {
      x: -1, // Shift to side
      z: 1.5, // Closer
      duration: 2,
      ease: "power1.inOut",
    }, 2);

    // PHASE 3: Detail Exploration (50% - 75%)
    // Focus on side/wheels
    tl.to(group.current.rotation, {
      y: -Math.PI / 8, // Turn other way
      duration: 2,
      ease: "power1.inOut",
    }, 4);

    tl.to(group.current.position, {
      x: 1,
      z: 2,
      duration: 2,
      ease: "power1.inOut",
    }, 4);

    // PHASE 4: Final Calm Pose (75% - 100%)
    // Center and settle
    tl.to(group.current.rotation, {
      y: 0,
      duration: 2,
      ease: "power2.out",
    }, 6);

    tl.to(group.current.position, {
      x: 0,
      z: 0.5,
      duration: 2,
      ease: "power2.out",
    }, 6);

  }, { scope: group });

  return (
    <group ref={group} dispose={null} position={[0, -0.5, -3]}> 
      {/* Initial position: far back and slightly down */}
      <primitive object={scene} scale={1.5} />
    </group>
  );
}

// Fallback component if model fails to load
function FallbackBox() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[2, 1, 4]} />
      <meshStandardMaterial color="#333" wireframe />
    </mesh>
  );
}

// --- Lights Component ---
function Lights() {
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    // Phase 1: Darkness -> Headlights
    tl.to(spotLightRef.current, {
      intensity: 2, // Fade in key light
      angle: 0.5,
      penumbra: 1,
      duration: 2,
    }, 0);

    tl.to(ambientRef.current, {
      intensity: 0.5, // Soft ambient
      duration: 2,
    }, 0);

    // Phase 2 & 3: Move light to highlight details
    if (spotLightRef.current) {
      tl.to(spotLightRef.current.position, {
        x: 5,
        z: 5,
        duration: 4,
      }, 2);
    }

  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.1} />
      <spotLight 
        ref={spotLightRef}
        position={[0, 5, -5]} 
        angle={0.2} 
        penumbra={1} 
        intensity={0} 
        castShadow 
        color="#fff"
      />
      {/* Rim light for cinematic feel */}
      <spotLight position={[-5, 2, -5]} intensity={2} color="#4a9eff" distance={10} />
    </>
  );
}

// --- Main Scene Component ---
export default function CinematicScene() {
  const scrollProgress = useRef(0);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-black">
      <Canvas shadows camera={{ position: [0, 1, 5], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 5, 15]} />
        
        <Lights />
        
        <Suspense fallback={<FallbackBox />}>
           {/* 
             We wrap the model in ErrorBoundary in a real app. 
             Here we just use Suspense fallback.
           */}
           <ErrorBoundary fallback={<FallbackBox />}>
              <BmwModel scrollProgress={scrollProgress} />
           </ErrorBoundary>
        </Suspense>

        <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#000" />
        
        {/* Environment for reflections */}
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}

// Simple Error Boundary for the model
class ErrorBoundary extends React.Component<{ fallback: React.ReactNode, children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
