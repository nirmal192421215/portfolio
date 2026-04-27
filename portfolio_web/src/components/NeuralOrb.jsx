import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Orb = () => {
  const meshRef = useRef();
  
  // Use useMemo to create the material to avoid recreating on ogni render
  const material = useMemo(() => (
    <MeshDistortMaterial
      color="#00d4ff"
      attach="material"
      distort={0.4}
      speed={2}
      roughness={0}
      metalness={1}
    />
  ), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
        meshRef.current.rotation.x = Math.cos(time / 4) / 2;
        meshRef.current.rotation.y = Math.sin(time / 4) / 2;
        meshRef.current.rotation.z = Math.sin(time / 4) / 2;
    }
  });

  return (
    <Sphere args={[1, 64, 64]} ref={meshRef}>
        {material}
    </Sphere>
  );
};

const NeuralOrb = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
          <Orb />
        </Float>
      </Canvas>
    </div>
  );
};

export default NeuralOrb;
