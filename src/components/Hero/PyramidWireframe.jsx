import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

const PyramidWireframe = ({ 
  position = [0, 0, 0], 
  size = 1, 
  color = '#cd6c24', /* Default to spice color */
  glowColor = 'rgba(205, 108, 36, 0.6)', /* Spice glow */
  rotationSpeed = 0.3
}) => {
  const groupRef = useRef();
  const { viewport } = useThree();
  
  // Adjust size based on viewport for responsiveness
  const responsiveSize = size * (viewport.width / 20);
  
  // Create cone geometry parameters
  const radius = responsiveSize;
  const height = responsiveSize * 1.5;
  const segments = 4;

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Rotate the pyramid slowly around the Y-axis
      groupRef.current.rotation.y = clock.getElapsedTime() * rotationSpeed;
      
      // Add slight wobble for dynamic effect
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.8) * 0.1;
    }
  });

  return (
    <group position={position} ref={groupRef}>
      {/* Base wireframe */}
      <mesh>
        <coneGeometry args={[radius, height, segments, 1]} />
        <meshBasicMaterial wireframe color={color} transparent opacity={0.5} />
      </mesh>
      
      {/* Secondary wireframe for more defined edges */}
      <mesh>
        <coneGeometry args={[radius, height, segments, 1]} />
        <meshBasicMaterial 
          color={color} 
          wireframe
          transparent
          opacity={0.8}
          wireframeLinewidth={2}
        />
      </mesh>
      
      {/* Emissive glow core */}
      <mesh>
        <coneGeometry args={[radius * 0.95, height * 0.97, segments, 1]} />
        <meshStandardMaterial 
          color="#2d2113" /* deep-desert for the inside */
          emissive={color}
          emissiveIntensity={0.7}
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
};

export default PyramidWireframe;
