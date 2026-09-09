import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CarModel3DProps {
  bodyColor?: string;
  accentColor?: string;
  wheelSpeed?: number;
}

export const CarModel3D: React.FC<CarModel3DProps> = ({
  bodyColor = '#18181b', // Deep sleek metallic obsidian
  accentColor = '#E2F163', // Soft Lemon accent
  wheelSpeed = 0.5,
}) => {
  const wheelsRef = useRef<THREE.Group>(null);
  const carGroupRef = useRef<THREE.Group>(null);

  // Rotate wheels during animation
  useFrame((_, delta) => {
    if (wheelsRef.current) {
      wheelsRef.current.children.forEach((wheel) => {
        wheel.rotation.x += delta * wheelSpeed * 4;
      });
    }
  });

  return (
    <group ref={carGroupRef} position={[0, 0.45, 0]}>
      {/* ===== LOWER CHASSIS & CARBON UNDERBODY ===== */}
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.08, 0.18, 4.6]} />
        <meshStandardMaterial color="#0a0a0c" roughness={0.7} metalness={0.8} />
      </mesh>

      {/* Front Splitter with Soft Lemon Lip Line */}
      <mesh position={[0, 0.06, 2.36]} castShadow>
        <boxGeometry args={[1.98, 0.04, 0.35]} />
        <meshStandardMaterial color="#08080a" roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh position={[0, 0.04, 2.5]}>
        <boxGeometry args={[1.9, 0.015, 0.04]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>

      {/* Rear Diffuser with Quad Fins */}
      <mesh position={[0, 0.12, -2.35]} castShadow>
        <boxGeometry args={[1.95, 0.22, 0.3]} />
        <meshStandardMaterial color="#09090b" roughness={0.4} metalness={0.9} />
      </mesh>

      {/* ===== MAIN SCULPTED BODY (METALLIC LUXURY PAINT) ===== */}
      {/* Main Hull */}
      <mesh position={[0, 0.36, 0.05]} castShadow receiveShadow>
        <boxGeometry args={[1.96, 0.38, 4.2]} />
        <meshPhysicalMaterial
          color={bodyColor}
          metalness={0.92}
          roughness={0.18}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
          reflectivity={0.9}
        />
      </mesh>

      {/* Front Sloping Hood / Bonnet */}
      <mesh position={[0, 0.42, 1.45]} rotation={[-0.14, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.86, 0.24, 1.65]} />
        <meshPhysicalMaterial
          color={bodyColor}
          metalness={0.92}
          roughness={0.18}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
        />
      </mesh>

      {/* Hood Power Bulge / Aerodynamic Center Recess */}
      <mesh position={[0, 0.54, 1.4]} rotation={[-0.14, 0, 0]} castShadow>
        <boxGeometry args={[0.75, 0.04, 1.2]} />
        <meshStandardMaterial color="#121214" roughness={0.4} metalness={0.95} />
      </mesh>

      {/* Front Nose Cone & Luxury Grille */}
      <mesh position={[0, 0.32, 2.22]} castShadow>
        <boxGeometry args={[1.84, 0.3, 0.25]} />
        <meshStandardMaterial color="#0f0f12" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Center Grille Mesh Pattern */}
      <mesh position={[0, 0.26, 2.34]}>
        <planeGeometry args={[1.1, 0.22]} />
        <meshStandardMaterial color="#050506" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Illuminated Grille Signature Emblem */}
      <mesh position={[0, 0.32, 2.36]}>
        <circleGeometry args={[0.055, 32]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>

      {/* ===== CABIN / GREENHOUSE (TINTED PANORAMIC GLASS) ===== */}
      <mesh position={[0, 0.72, -0.25]} castShadow>
        <boxGeometry args={[1.56, 0.42, 2.1]} />
        <meshPhysicalMaterial
          color="#030304"
          transmission={0.88}
          opacity={1}
          transparent={true}
          roughness={0.05}
          metalness={0.1}
          ior={1.52}
          thickness={0.5}
        />
      </mesh>

      {/* Windshield Pillar Slopes */}
      <mesh position={[0, 0.68, 0.72]} rotation={[0.54, 0, 0]} castShadow>
        <boxGeometry args={[1.54, 0.08, 0.85]} />
        <meshPhysicalMaterial
          color="#050506"
          transmission={0.85}
          transparent={true}
          roughness={0.05}
          metalness={0.1}
        />
      </mesh>

      {/* Rear Fastback Sloping Glass */}
      <mesh position={[0, 0.65, -1.25]} rotation={[-0.48, 0, 0]} castShadow>
        <boxGeometry args={[1.48, 0.08, 0.95]} />
        <meshPhysicalMaterial
          color="#050506"
          transmission={0.85}
          transparent={true}
          roughness={0.05}
          metalness={0.1}
        />
      </mesh>

      {/* Roof Carbon Fiber Center Panel */}
      <mesh position={[0, 0.94, -0.25]} castShadow>
        <boxGeometry args={[1.35, 0.04, 1.4]} />
        <meshStandardMaterial color="#0e0e11" roughness={0.3} metalness={0.95} />
      </mesh>

      {/* ===== SIDE MIRRORS WITH LEMON INDICATORS ===== */}
      <mesh position={[0.98, 0.62, 0.52]} castShadow>
        <boxGeometry args={[0.22, 0.09, 0.12]} />
        <meshStandardMaterial color="#121214" roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh position={[1.08, 0.62, 0.52]}>
        <boxGeometry args={[0.02, 0.025, 0.1]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>
      <mesh position={[-0.98, 0.62, 0.52]} castShadow>
        <boxGeometry args={[0.22, 0.09, 0.12]} />
        <meshStandardMaterial color="#121214" roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh position={[-1.08, 0.62, 0.52]}>
        <boxGeometry args={[0.02, 0.025, 0.1]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>

      {/* ===== HEADLIGHTS & LEMON DAYTIME RUNNING LIGHTS ===== */}
      {/* Right Headlight Cluster */}
      <mesh position={[0.68, 0.38, 2.12]} rotation={[-0.1, 0.15, 0]}>
        <boxGeometry args={[0.38, 0.09, 0.22]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3.5} />
      </mesh>
      {/* Right Lemon DRL Eyebrow */}
      <mesh position={[0.7, 0.44, 2.14]} rotation={[-0.1, 0.15, 0]}>
        <boxGeometry args={[0.42, 0.02, 0.18]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>

      {/* Left Headlight Cluster */}
      <mesh position={[-0.68, 0.38, 2.12]} rotation={[-0.1, -0.15, 0]}>
        <boxGeometry args={[0.38, 0.09, 0.22]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3.5} />
      </mesh>
      {/* Left Lemon DRL Eyebrow */}
      <mesh position={[-0.7, 0.44, 2.14]} rotation={[-0.1, -0.15, 0]}>
        <boxGeometry args={[0.42, 0.02, 0.18]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>

      {/* ===== REAR TAILLIGHTS & LIGHTBAR ===== */}
      {/* Continuous Ultra-Thin LED Strip */}
      <mesh position={[0, 0.48, -2.12]}>
        <boxGeometry args={[1.86, 0.045, 0.08]} />
        <meshStandardMaterial color="#ff1133" emissive="#ff1133" emissiveIntensity={4.5} />
      </mesh>
      {/* Dual Exhaust Tips */}
      <mesh position={[0.55, 0.15, -2.32]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.075, 0.075, 0.2, 24]} />
        <meshStandardMaterial color="#3f3f46" metalness={0.95} roughness={0.15} />
      </mesh>
      <mesh position={[-0.55, 0.15, -2.32]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.075, 0.075, 0.2, 24]} />
        <meshStandardMaterial color="#3f3f46" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* ===== WHEELS & BRAKES ASSEMBLY ===== */}
      <group ref={wheelsRef}>
        {/* Front Right */}
        <group position={[0.98, -0.08, 1.42]}>
          {/* Tire */}
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.37, 0.37, 0.28, 32]} />
            <meshStandardMaterial color="#141416" roughness={0.8} />
          </mesh>
          {/* Forged Diamond Alloy Rim */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.26, 0.26, 0.29, 16]} />
            <meshStandardMaterial color="#a1a1aa" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Soft Lemon Brake Caliper */}
          <mesh position={[0.02, 0.12, 0]}>
            <boxGeometry args={[0.12, 0.14, 0.08]} />
            <meshStandardMaterial color={accentColor} roughness={0.3} metalness={0.7} />
          </mesh>
        </group>

        {/* Front Left */}
        <group position={[-0.98, -0.08, 1.42]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.37, 0.37, 0.28, 32]} />
            <meshStandardMaterial color="#141416" roughness={0.8} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.26, 0.26, 0.29, 16]} />
            <meshStandardMaterial color="#a1a1aa" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[-0.02, 0.12, 0]}>
            <boxGeometry args={[0.12, 0.14, 0.08]} />
            <meshStandardMaterial color={accentColor} roughness={0.3} metalness={0.7} />
          </mesh>
        </group>

        {/* Rear Right */}
        <group position={[1.0, -0.08, -1.42]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.38, 0.38, 0.32, 32]} />
            <meshStandardMaterial color="#141416" roughness={0.8} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.27, 0.27, 0.33, 16]} />
            <meshStandardMaterial color="#a1a1aa" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[0.02, 0.12, 0]}>
            <boxGeometry args={[0.12, 0.14, 0.08]} />
            <meshStandardMaterial color={accentColor} roughness={0.3} metalness={0.7} />
          </mesh>
        </group>

        {/* Rear Left */}
        <group position={[-1.0, -0.08, -1.42]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.38, 0.38, 0.32, 32]} />
            <meshStandardMaterial color="#141416" roughness={0.8} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.27, 0.27, 0.33, 16]} />
            <meshStandardMaterial color="#a1a1aa" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[-0.02, 0.12, 0]}>
            <boxGeometry args={[0.12, 0.14, 0.08]} />
            <meshStandardMaterial color={accentColor} roughness={0.3} metalness={0.7} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

