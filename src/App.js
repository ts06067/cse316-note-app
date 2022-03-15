import "./App.css";
import NoteAppContainer from "./components/NoteAppContainer";
import NoteStorageUtils from "./api/NoteStorageUtils";

function App() {
  let notes = NoteStorageUtils.getNoteList();

  const sampleNote = { id: 0, body: "Hello World" };

  NoteStorageUtils.setNoteList(sampleNote);

  notes = NoteStorageUtils.getNoteList();

  console.log(notes);

  return (
    <div className="App">
      <NoteAppContainer></NoteAppContainer>
    </div>
  );
}

export default App;
