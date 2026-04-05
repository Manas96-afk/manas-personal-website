'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Stage, 
  PresentationControls, 
  Float, 
  ContactShadows,
  useTexture
} from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function DragonModel(props: any) {
  const group = useRef<THREE.Group>(null);
  
  // Create a serpentine body
  const segmentCount = 30;
  const segments = useMemo(() => {
    return new Array(segmentCount).fill(0).map((_, i) => {
      const t = i / segmentCount;
      const scale = 1 - Math.pow(t - 0.2, 2); // Thicker near head
      return {
        position: [
          Math.sin(t * Math.PI * 2) * 2,
          Math.cos(t * Math.PI * 4) * 0.5,
          (i - segmentCount / 2) * 0.8
        ],
        rotation: [Math.PI / 2, 0, Math.sin(t * Math.PI * 4) * 0.5],
        scale: Math.max(0.2, scale)
      };
    });
  }, []);

  useFrame((state) => {
    if (group.current) {
      // Undulate body
      group.current.children.forEach((child, i) => {
        const t = i / segmentCount;
        child.position.y += Math.sin(state.clock.elapsedTime * 2 + t * 10) * 0.005;
        child.rotation.z = Math.sin(state.clock.elapsedTime * 2 + t * 10) * 0.2;
      });
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {segments.map((s, i) => (
        <group key={i} position={s.position as any} rotation={s.rotation as any}>
          {/* Scale/Body Segment */}
          <mesh>
            <coneGeometry args={[0.6 * s.scale, 1.2, 6]} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#8b0000" : "#ff4500"} 
              roughness={0.4}
              metalness={0.6}
            />
          </mesh>
          {/* Spikes */}
          <mesh position={[0, 0.4, 0]} rotation={[-Math.PI/4, 0, 0]}>
            <coneGeometry args={[0.1 * s.scale, 0.6, 4]} />
            <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ))}
      
      {/* Head */}
      <group position={[0, 0.5, 12]} rotation={[0, Math.PI, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.2, 0.8, 1.5]} />
          <meshStandardMaterial color="#8b0000" roughness={0.3} />
        </mesh>
        {/* Eyes */}
        <mesh position={[0.3, 0.2, 0.6]}>
          <sphereGeometry args={[0.15]} />
          <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} />
        </mesh>
        <mesh position={[-0.3, 0.2, 0.6]}>
          <sphereGeometry args={[0.15]} />
          <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} />
        </mesh>
        {/* Horns */}
        <mesh position={[0.4, 0.6, -0.4]} rotation={[-0.5, 0, 0]}>
          <coneGeometry args={[0.1, 1, 8]} />
          <meshStandardMaterial color="#ffd700" metalness={1} />
        </mesh>
        <mesh position={[-0.4, 0.6, -0.4]} rotation={[-0.5, 0, 0]}>
          <coneGeometry args={[0.1, 1, 8]} />
          <meshStandardMaterial color="#ffd700" metalness={1} />
        </mesh>
      </group>
    </group>
  );
}

export default function Passion3D() {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 45 }}>
        <color attach="background" args={['#09090b']} />
        
        <PresentationControls 
          speed={1.5} 
          global 
          zoom={0.7} 
          polar={[-0.1, Math.PI / 4]}
          rotation={[Math.PI / 8, Math.PI / 4, 0]}
        >
          <Stage environment="city" intensity={0.6}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <DragonModel scale={0.5} />
            </Float>
          </Stage>
        </PresentationControls>
        
        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
      </Canvas>
      
      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
        <p className="text-zinc-500 text-xs uppercase tracking-widest">
          Interactive Dragon • Drag to Rotate
        </p>
      </div>
    </div>
  );
}
