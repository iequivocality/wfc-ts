import { useEffect, useRef } from "react";

const TILES = [
  {
    imageUrl: "/tiles/blank.jpg"
  },
  {
    imageUrl: "/tiles/cross.jpg"
  },
  {
    imageUrl: "/tiles/horizontal.jpg"
  },
  {
    imageUrl: "/tiles/t_down.jpg"
  },
  {
    imageUrl: "/tiles/t_left.jpg"
  },
  {
    imageUrl: "/tiles/t_right.jpg"
  },
  {
    imageUrl: "/tiles/t_up.jpg"
  },
  {
    imageUrl: "/tiles/vertical.jpg"
  }
];

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    console.log("App", canvasRef.current)
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, 480, 480);

        let startX = 0;
        let startY = 0;

        for (let i = 0; i < TILES.length; i++) {
          const tile = TILES[i];
          const tileImage = new Image();
          tileImage.width = 48;
          tileImage.height = 48;
          tileImage.src = tile.imageUrl;
          tileImage.addEventListener("load", () => {
            ctx.drawImage(tileImage, startX, startY, 48, 48);
            if (startX + 48 >= 480) {
              startX = 0;
              startY += 48;
            } else {
              startX += 48;
            }
          });
        }
      }
    }
  }, [canvasRef]);

  return (
    <main>
      <h1 className="text-3xl font-bold my-8">
        Wave Function Collapse TS
      </h1>
      <canvas width={480} height={480} ref={canvasRef}>

      </canvas>
    </main>
  )
}

export default App
