import "./App.css";
import Game from "./components/Game";

function App() {
  return (
    <div className="App">
      <Game game={{ squareCount: 24, chainLength: 2 }} />
    </div>
  );
}

export default App;
