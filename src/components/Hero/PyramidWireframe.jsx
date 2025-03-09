import { use, useEffect, useLayoutEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';
import { memo } from 'react';

const PyramidWireframe = memo(({ 
  position = [0, 0, 0], 
  size = 1, 
  color = '#cd6c24',
  rotationSpeed = 0.3
}) => {
  const groupRef = useRef();
  const { viewport } = useThree();
  const responsiveSize = size * (viewport.width / 20);
  
  const animationRef = useRef({
    rotationSpeed,
  });

  useRef(() => {
    animationRef.current.rotationSpeed = rotationSpeed;
  }, [rotationSpeed]);

  const radius = responsiveSize;
  const height = responsiveSize * 1.5;
  const segments = 4;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    
    const time = clock.getElapsedTime();
    const group = groupRef.current;
    const speed = animationRef.current.rotationSpeed;
    
    group.rotation.y = time * speed;
    group.rotation.x = Math.sin(time * 0.5) * 0.1;
    group.position.y = Math.sin(time * 0.8) * 0.1;
  });
  return (
    <group position={position} ref={groupRef}>
      <mesh>
        <coneGeometry args={[radius, height, segments, 1]} />
        <meshBasicMaterial wireframe color={color} transparent opacity={0.5} />
      </mesh>
      
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
      
      <mesh>
        <coneGeometry args={[radius * 0.95, height * 0.97, segments, 1]} />
        <meshStandardMaterial 
          color="#2d2113" 
          emissive={color}
          emissiveIntensity={0.7}
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
});

export default PyramidWireframe;
