import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import HeaderSection from "./components/HeaderSection/HeaderSection";
import Home from "./components/Homescreen/index.js";
import Footer from "./components/Footer/Footer";
import { CursorOne } from "cursor-style";
import { Fluid } from "@whatisjery/react-fluid-distortion";
import { EffectComposer } from "@react-three/postprocessing";
import { Canvas } from "@react-three/fiber";
import { Text as DreiText } from "@react-three/drei";
import Modesfa from "./font/Modesfa.otf";
import { useMediaQuery } from "react-responsive";
import img from "./assets/img/1.png";
import { useTexture } from "@react-three/drei";
import ScrollToTop from "react-scroll-up";
import { FaArrowUp } from "react-icons/fa";
import LoadingScreenn from "./LoadingScreen";

const LoadingScreen = () => (
  <div className="loading-screen">
    <LoadingScreenn />
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Assuming that all necessary data is being loaded here
    // In this example, I will set loading to false after a certain time period (3 seconds) as an experiment
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const Image = () => {
    const texture = useTexture(img);

    return (
      <mesh position-z={-1} position-x={0} position-y={1}>
        <planeGeometry
          args={[isSmallScreen ? 4 : 7, isSmallScreen ? 5 : 10, 20, 20]}
          attach="geometry"
        />
        <meshBasicMaterial map={texture} color={0xffffff} attach="material" />
      </mesh>
    );
  };

  const isSmallScreen = useMediaQuery({ maxWidth: 1200 });
  const scrollToTopStyle = {
    position: "fixed",
    bottom: 50,
    right: 30,
    cursor: "pointer",
    transition: "all 0.3s ease",
    backgroundColor: "#0001",
    color: "#FFFFFF",
    borderRadius: "8px",
    width: "30px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  };

  return (
    <Router>
      <CursorOne
        size={70}
        delay={7}
        sizeDot={15}
        sizeOutline={35}
        bgColor="white"
        bgColorOutline="#131313"
        useMixBlendDifference={true}
      />

      <div className="App">
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            <HeaderSection />
            <Canvas
              style={{
                position: "relative",
                top: 0,
                left: 0,
                height: "100vh",
                width: "100vw",
                background: "transparent",
              }}
            >
              <EffectComposer>
                <Fluid
                  fluidColor="#131313"
                  backgroundColor="#656569"
                  showBackground={false}
                  distortion={0.6}
                  curl={0.1}
                />

                <group>
                  <DreiText
                    maxWidth={isSmallScreen ? 5 : 20}
                    textAlign="center"
                    fontSize={isSmallScreen ? 0.55 : 2}
                    lineHeight={1.5}
                    position-y={1}
                    color="white"
                    width
                    font={Modesfa}
                  >
                    Full Stack Developer
                  </DreiText>

                  <DreiText
                    textAlign="center"
                    letterSpacing={-0.07}
                    position-y={1}
                    fontSize={isSmallScreen ? 0.15 : 0.5}
                    font={Modesfa}
                  >
                    always ready to tackle, challenges head-on
                  </DreiText>
                </group>
              </EffectComposer>
              <Image />
            </Canvas>
            <Home />
            <Footer />
            <ScrollToTop showUnder={160} style={scrollToTopStyle}>
              <FaArrowUp size={24} />
            </ScrollToTop>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
