import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { CarModel3D } from './CarModel3D';

const StoryCarPresentation = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.45;
    }
  });

  return (
    <group ref={groupRef}>
      <CarModel3D bodyColor="#0e0e11" accentColor="#E2F163" wheelSpeed={0.3} />
    </group>
  );
};

export const StoryScene3D: React.FC = () => {
  return (
    <div className="relative w-full h-[450px] md:h-[550px] rounded-3xl overflow-hidden bg-brand-graphite border border-white/10 shadow-2xl">
      <Canvas
        camera={{ position: [4.2, 1.8, 5.2], fov: 40 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-5, 6, -5]} intensity={2.8} color="#E2F163" />
        <pointLight position={[0, 2, 4]} intensity={2} color="#ffffff" />
        
        {/* Reflective Studio Pedestal */}
        <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[6, 64]} />
          <meshStandardMaterial color="#0a0a0c" roughness={0.15} metalness={0.9} />
        </mesh>
        
        {/* Lemon Pedestal Ring */}
        <mesh position={[0, -0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.4, 3.45, 64]} />
          <meshBasicMaterial color="#E2F163" />
        </mesh>

        <StoryCarPresentation />
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minPolarAngle={Math.PI / 4}
          autoRotate={false}
        />
      </Canvas>

      {/* Interactive Drag Hint Overlay */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-none glass-panel-dark px-4 py-1.5 rounded-full border border-white/10 text-xs text-white/70 font-mono uppercase tracking-luxury">
        ✦ Drag to inspect 360° chassis
      </div>
    </div>
  );
};

