import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PyramidWireframe from "./PyramidWireframe";
import { useState, useCallback, useLayoutEffect } from "react";

//unecessary memory allocation
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
      return [0, 0, 0];
  }
};

const PyramidScene = ({ style, position: pos = "right" }) => {
  const [pyramidSize, setPyramidSize] = useState(3);
  const [position, setPosition] = useState(pos);
  useLayoutEffect(() => {
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

    calculateSize();

    window.addEventListener("resize", calculateSize);

    return () => window.removeEventListener("resize", calculateSize);
  }, []);

  const RenderPyramid = useCallback(
    () => (
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
          rotationSpeed={0.2}
        />
        <OrbitControls enabled={false} />
      </Canvas>
    ),
    [pyramidSize]
  );

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
      <RenderPyramid />
    </div>
  );
};

export default PyramidScene;
