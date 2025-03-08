import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PyramidWireframe from "./PyramidWireframe";
import { useState, useEffect } from "react";

const PyramidScene = ({ style, position: pos = "right" }) => {
  const [pyramidSize, setPyramidSize] = useState(3);
  const [position, setPosition] = useState(pos);
  useEffect(() => {
    const calculateSize = () => {
      setPyramidSize(() => {
        if (window.innerWidth <= 768) {
          setPosition("bottom");
          return 5;
        } else {
          setPosition("right");
          return 3;
        }
      });
    };

    // Set initial size
    calculateSize();

    // Add resize event listener
    const handleResize = () => {
      calculateSize();
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate pyramid position based on the position prop
  const getPyramidPosition = (position) => {
    switch (position) {
      case "left":
        return [-2, -0.5, 0]; 
      case "right":
        return [2, -0.5, 0];
      case "bottom":
        return [0, -1.5, 0];
      case "top":
        return [0, 1.5, 0];
      case "bottom-left":
        return [-2, -1, 0];
      case "bottom-right":
        return [2, -1, 0];
      case "top-left":
        return [-2, 1, 0];
      case "top-right":
        return [2, 1, 0];
      default:
        return [0, 0, 0]; // Center as fallback
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
        ...style,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#cd6c24" />

        <PyramidWireframe
          position={getPyramidPosition(position)}
          size={pyramidSize}
          color="#cd6c24"
          glowColor="rgba(205, 108, 36, 0.6)"
          rotationSpeed={0.2}
        />

        {/* Disable controls since this is a background element */}
        <OrbitControls enabled={false} />
      </Canvas>
    </div>
  );
};

export default PyramidScene;
