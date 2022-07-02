import { useState } from "react";
import Canvas from "./Canvas";
import GameCTX, { GameState } from "./GameCTX";
import Board from "./Board";

const App = () => {
  const [canvas, setCanvas] = useState(undefined);
  const [gameState, setGameState] = useState(GameState.IDLE);
  const [isMouseDown, setIsMouseDown] = useState(false);

  return (
    <GameCTX.Provider
      value={{
        isMouseDown,
        setIsMouseDown,
        gameState,
        setGameState,
        canvas,
        setCanvas,
      }}
    >
      <Canvas style={{ height: 800, width: 800 }}>
        <Board />
      </Canvas>
    </GameCTX.Provider>
  );
};
export default App;
