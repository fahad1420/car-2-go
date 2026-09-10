import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CarModel3D } from './CarModel3D';
import { StudioEnvironment } from './StudioEnvironment';

// 8 Cinematic Camera Waypoints
const CINEMATIC_KEYFRAMES = [
  // Scene 1: Wide environmental establishing shot
  { pos: new THREE.Vector3(0, 3.2, 8.8), target: new THREE.Vector3(0, 0.4, 0), duration: 3.8 },
  // Scene 2: Low-angle front approach
  { pos: new THREE.Vector3(2.4, 1.1, 4.8), target: new THREE.Vector3(0, 0.5, 1.2), duration: 4.2 },
  // Scene 3: Dramatic 3/4 front wheel & headlight close-up
  { pos: new THREE.Vector3(-3.2, 0.85, 3.5), target: new THREE.Vector3(-0.5, 0.4, 1.0), duration: 4.0 },
  // Scene 4: Low-slung side profile lateral glide
  { pos: new THREE.Vector3(-5.2, 1.2, 0.2), target: new THREE.Vector3(0, 0.5, 0), duration: 4.0 },
  // Scene 5: High-angle crane sweep over carbon roof
  { pos: new THREE.Vector3(-2.8, 3.6, -3.8), target: new THREE.Vector3(0, 0.4, 0), duration: 4.2 },
  // Scene 6: Rear quarter taillight & quad diffuser stance
  { pos: new THREE.Vector3(2.8, 1.0, -4.2), target: new THREE.Vector3(0, 0.45, -1.2), duration: 4.0 },
  // Scene 7: Dynamic right flank sweep
  { pos: new THREE.Vector3(4.8, 1.5, 1.2), target: new THREE.Vector3(0.2, 0.45, 0.4), duration: 4.0 },
  // Scene 8: Wide crane pull-back returning gracefully to establish loop
  { pos: new THREE.Vector3(1.2, 3.4, 7.8), target: new THREE.Vector3(0, 0.4, 0), duration: 3.8 },
];

const CameraDirector: React.FC<{
  onSceneChange?: (sceneIndex: number) => void;
}> = ({ onSceneChange }) => {
  const { camera } = useThree();
  const currentKeyframe = useRef(0);
  const progress = useRef(0);
  const currentLookAt = useRef(new THREE.Vector3(0, 0.4, 0));

  useFrame((_, delta) => {
    const kfList = CINEMATIC_KEYFRAMES;
    const fromIndex = currentKeyframe.current;
    const toIndex = (fromIndex + 1) % kfList.length;

    const from = kfList[fromIndex];
    const to = kfList[toIndex];

    // Increment progress normalized by duration
    progress.current += delta / from.duration;

    if (progress.current >= 1) {
      progress.current = 0;
      currentKeyframe.current = toIndex;
      if (onSceneChange) onSceneChange(toIndex);
    }

    // Smooth cubic hermite easing
    const t = progress.current;
    const smoothT = t * t * (3 - 2 * t);

    // Interpolate camera position
    const currentPos = new THREE.Vector3().lerpVectors(from.pos, to.pos, smoothT);
    camera.position.copy(currentPos);

    // Interpolate camera look-at target
    const targetLook = new THREE.Vector3().lerpVectors(from.target, to.target, smoothT);
    currentLookAt.current.lerp(targetLook, delta * 3);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};

export const HeroScene3D: React.FC<{
  bodyColor?: string;
  accentColor?: string;
  className?: string;
}> = ({
  bodyColor = '#16161a',
  accentColor = '#E2F163',
  className = '',
}) => {
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [activeScene, setActiveScene] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport, { passive: true });
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
      }
    } catch (e) {
      setWebglSupported(false);
    }
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-brand-charcoal ${className}`}>
      {/* 3D WebGL Canvas Layer */}
      {webglSupported ? (
        <Canvas
          shadows
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.15,
            powerPreference: 'high-performance',
          }}
          camera={{
            position: isMobile ? [0, 3.8, 10.5] : [0, 3.2, 8.8],
            fov: isMobile ? 52 : 42,
            near: 0.1,
            far: 50,
          }}
          className="w-full h-full"
        >
          <CameraDirector onSceneChange={setActiveScene} />
          <StudioEnvironment accentColor={accentColor} />
          <CarModel3D bodyColor={bodyColor} accentColor={accentColor} wheelSpeed={0.8} />
        </Canvas>
      ) : (
        /* Fallback High-End Visual Engine if WebGL is disabled */
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2000&q=85')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/40 to-transparent" />
        </div>
      )}

      {/* Cinematic Vignette & Bottom Blend Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-brand-charcoal/40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-charcoal/90 via-transparent to-brand-charcoal/90 md:from-brand-charcoal/80 md:to-brand-charcoal/80" />

      {/* Subtle Live Cinematic HUD Indicator */}
      <div className="pointer-events-none absolute bottom-8 right-8 z-10 hidden md:flex items-center gap-3 glass-panel-dark px-4 py-2 rounded-full border border-white/10">
        <span className="w-2 h-2 rounded-full bg-brand-lemon animate-ping" />
        <span className="text-xs uppercase tracking-luxury text-white/80 font-mono">
          DIRECTOR FEED • SCENE 0{activeScene + 1} / 08
        </span>
      </div>
    </div>
  );
};

