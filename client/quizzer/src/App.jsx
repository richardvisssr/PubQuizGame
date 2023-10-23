import "./App.css";
import GamePinInput from "./components/team/GamePinInput";
import WaitingScreen from "./components/team/WaitingScreen";

function App() {
  return (
    <div className="App">
      <WaitingScreen waiting={"questions"}/>
    </div>
  );
}

export default App;
