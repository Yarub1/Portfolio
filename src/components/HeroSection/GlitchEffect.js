import React, { useEffect, useRef } from "react";
import "./GlitchEffect.css";

const GlitchEffect = () => {
  
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };

    const noise = () => {
      const w = ctx.canvas.width,
        h = ctx.canvas.height,
        iData = ctx.createImageData(w, h),
        buffer32 = new Uint32Array(iData.data.buffer),
        len = buffer32.length;
      let i = 1;

      for (; i < len; i++) if (Math.random() < 0.5) buffer32[i] = 0xffffffff;

      ctx.putImageData(iData, 0, 0);
    };

    const loop = () => {
      noise();
      animationFrameId = requestAnimationFrame(loop);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="glitch-canvas"></canvas>;
};

export default GlitchEffect;
