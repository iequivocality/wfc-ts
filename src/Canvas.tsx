import { useEffect, useRef } from "react";

export const useCanvas = (draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    let frameCount = 0;
    let animationFrameId = -1;
    if (canvas) {
      const context = canvas.getContext('2d');
      const render = () => {
        frameCount++;
        if (context) {
          draw(context, frameCount);
        }
        animationFrameId = window.requestAnimationFrame(render)
      }
      render();

      return () => {
        window.cancelAnimationFrame(animationFrameId);
      }
    }
  }, [draw]);

  return canvasRef;
};