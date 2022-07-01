import { useState } from "react";
import Canvas from "./Canvas";
import GameCTX, { GameState } from "./GameCTX";
import Board from "./Board";
import Events from "./Events";

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
      <Canvas>
        <Board />
        <Events />
      </Canvas>
    </GameCTX.Provider>
  );
};
export default App;
