import { useEffect, useRef, useState } from "react";
import { colors, textColors } from "./colors";
import "./App.css";

function App() {
  const [index, setIndex] = useState(Math.floor(Math.random() * 5));
  const [color, setColor] = useState(Math.floor(Math.random() * 5));
  const [started, setStarted] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(ref.current);
    };
  }, []);

  return (
    <div className="container">
      <div className="game">
        <h1
          style={{
            color: `${textColors[color]}`,
            fontSize: `${started ? "5rem" : "3rem"}`,
            textTransform: "uppercase",
            letterSpacing: "5px",
            fontWeight: 900,
          }}
        >
          {started ? colors[index] : "Let's Start"}
        </h1>

        <div className="btn-container">
          <button
            onClick={() => {
              if (ref.current) {
                clearInterval(ref.current);
                ref.current = null;
                setStarted(false);
              } else {
                setStarted(true);
                ref.current = setInterval(() => {
                  setIndex(Math.floor(Math.random() * textColors.length));
                  setColor(Math.floor(Math.random() * colors.length));
                }, 2000);
              }
            }}
          >
            {started && ref.current !== null ? "Stop" : "Start"}
          </button>
        </div>
      </div>
      {!started && (
        <div>
          <p>Click on start above to start the game</p>
          <p style={{ fontSize: "18px" }}>
            Read out color of the text not the text
          </p>
          <p>Below are the colors being used</p>
        </div>
      )}
      <div className="color-container">
        {textColors.map(col => {
          return (
            <div>
              <div className="color" style={{ backgroundColor: col }}></div>
              <p className="text">{col}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
