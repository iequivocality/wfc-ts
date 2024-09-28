import { useEffect, useRef } from "react";
import { Tile, TileMetadata, Wave } from "./wfc";
import { useCanvas } from "./Canvas";

interface ImageTileMetadata extends TileMetadata {
  imageUrl: string;
}

const TILE_IMAGES: ImageTileMetadata[] = [
  {
    id: "BLANK",
    constraints: [],
    default: true,
    imageUrl: "/tiles/blank.jpg"
  },
  {
    id: "CROSS",
    constraints: [
      { direction: "up", possibleIds: ["CROSS", "T_DOWN", "T_LEFT", "T_RIGHT", "VERT"] },
      { direction: "down", possibleIds: ["CROSS", "T_LEFT", "T_RIGHT", "T_UP", "VERT"] },
      { direction: "left", possibleIds: ["CROSS", "HORIZ", "T_DOWN", "T_RIGHT", "T_UP"] },
      { direction: "right", possibleIds: ["CROSS", "HORIZ", "T_DOWN", "T_LEFT", "T_UP"] }
    ],
    imageUrl: "/tiles/cross.jpg"
  },
  {
    id: "HORIZ",
    constraints: [],
    imageUrl: "/tiles/horizontal.jpg"
  },
  {
    id: "T_DOWN",
    constraints: [],
    imageUrl: "/tiles/t_down.jpg"
  },
  {
    id: "T_LEFT",
    constraints: [],
    imageUrl: "/tiles/t_left.jpg"
  },
  {
    id: "T_RIGHT",
    constraints: [],
    imageUrl: "/tiles/t_right.jpg"
  },
  {
    id: "T_UP",
    constraints: [],
    imageUrl: "/tiles/t_up.jpg"
  },
  {
    id: "VERT",
    constraints: [],
    imageUrl: "/tiles/vertical.jpg"
  }
];

function App() {
  const width = 10;
  const height = 10;
  const tileSize = 48;

  const wave = useRef(new Wave({
    width,
    height,
    tileSize,
    tileMetadata: TILE_IMAGES
  }));

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    if (frameCount % 60 !== 0) {
      return;
    }

    const grid = wave.current.update();

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const tile: Tile<ImageTileMetadata[]> = grid[i + j];
        const metadata : ImageTileMetadata = tile.observe();
        const tileImage = new Image(tileSize, tileSize);
        tileImage.src = metadata.imageUrl;
        tileImage.addEventListener("load", () => {
          ctx.drawImage(tileImage, j * tileSize, i * tileSize, tileSize, tileSize);
        });
        
      }
    }
  }

  const canvasRef = useCanvas(draw);
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#31446E";
        ctx.fillRect(0, 0, 480, 480);

        const grid = wave.current.update();

        for (let i = 0; i < width; i++) {
          for (let j = 0; j < height; j++) {
            const tile: Tile<ImageTileMetadata[]> = grid[i + j];
            const metadata : ImageTileMetadata = tile.observe();
            const tileImage = new Image(tileSize, tileSize);
            tileImage.src = metadata.imageUrl;
            tileImage.addEventListener("load", () => {
              ctx.drawImage(tileImage, j * tileSize, i * tileSize, tileSize, tileSize);
            });
            
          }
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
