import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StudioEnvironmentProps {
  accentColor?: string;
}

export const StudioEnvironment: React.FC<StudioEnvironmentProps> = ({
  accentColor = '#E2F163'
}) => {
  const sweepLightRef = useRef<THREE.PointLight>(null);
  const overheadSoftboxRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Subtle dust particles
  const particlePositions = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = Math.random() * 6 + 0.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    return positions;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Moving soft lemon light sweep around the car
    if (sweepLightRef.current) {
      sweepLightRef.current.position.x = Math.sin(t * 0.45) * 5.5;
      sweepLightRef.current.position.z = Math.cos(t * 0.45) * 5.5;
      sweepLightRef.current.position.y = 1.6 + Math.sin(t * 0.8) * 0.6;
    }

    // Gentle particle motion
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.02;
    }
  });

  return (
    <>
      {/* ===== AMBIENT & DIRECTIONAL LIGHTING ===== */}
      <ambientLight intensity={0.35} color="#18181b" />

      {/* Main Studio Key Light (Cool White / Neutral) */}
      <directionalLight
        position={[6, 9, 6]}
        intensity={2.8}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />

      {/* Rim / Back Light for vehicle silhouette separation */}
      <directionalLight
        position={[-6, 7, -6]}
        intensity={3.2}
        color="#f4f4f5"
      />

      {/* Soft Lemon Signature Sweeping Accent Light */}
      <pointLight
        ref={sweepLightRef}
        color={accentColor}
        intensity={4.5}
        distance={12}
        decay={2}
      />

      {/* Front Fill Accent */}
      <spotLight
        position={[0, 4, 7]}
        target-position={[0, 0.5, 0]}
        angle={0.6}
        penumbra={0.8}
        intensity={2.0}
        color="#fefefe"
      />

      {/* ===== OVERHEAD STUDIO SOFTBOX LIGHT ARRAYS ===== */}
      <group ref={overheadSoftboxRef} position={[0, 5.8, 0]}>
        {/* Main Center Softbox Light Strip */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.4, 7.5]} />
          <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
        </mesh>
        {/* Left Side Softbox Angle */}
        <mesh position={[-3.6, -0.4, 0]} rotation={[Math.PI / 2.2, 0, 0.2]}>
          <planeGeometry args={[1.2, 7.5]} />
          <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
        </mesh>
        {/* Right Side Softbox Angle */}
        <mesh position={[3.6, -0.4, 0]} rotation={[Math.PI / 2.2, 0, -0.2]}>
          <planeGeometry args={[1.2, 7.5]} />
          <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* ===== ARCHITECTURAL STUDIO WALLS & PILLARS ===== */}
      {/* Background Curved Wall */}
      <mesh position={[0, 4, -9]} receiveShadow>
        <planeGeometry args={[32, 12]} />
        <meshStandardMaterial color="#0b0b0e" roughness={0.85} metalness={0.2} />
      </mesh>

      {/* Studio Vertical Architectural Light Slits */}
      {[-7, -3.5, 3.5, 7].map((xPos, idx) => (
        <group key={idx} position={[xPos, 4, -8.9]}>
          <mesh>
            <planeGeometry args={[0.08, 10]} />
            <meshBasicMaterial color={idx % 2 === 0 ? accentColor : '#ffffff'} />
          </mesh>
        </group>
      ))}

      {/* ===== HIGH-GLOSS REFLECTIVE SHOWROOM FLOOR ===== */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[45, 45]} />
        <meshStandardMaterial
          color="#08080a"
          roughness={0.12}
          metalness={0.88}
        />
      </mesh>

      {/* Floor Subtle Center Glow Ring */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.2, 3.25, 64]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.3} />
      </mesh>

      {/* Floor Outer Perimeter Ring */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.8, 5.83, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
      </mesh>

      {/* ===== FLOATING ATMOSPHERIC PARTICLES ===== */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color={accentColor}
          transparent
          opacity={0.4}
          sizeAttenuation
        />
      </points>
    </>
  );
};

