import logo from "./logo.svg";
import "./App.css";
import NoteAppContainer from "./components/NoteAppContainer";
import SidePanel from "./components/SidePanel.js";
import MainPanel from "./components/MainPanel";

function App() {
  return (
    <div className="App">
      <NoteAppContainer></NoteAppContainer>
    </div>
  );
}

export default App;
