import "./css/SidePanel.css";
import SearchBar from "./SearchBar";
import TopBarLeft from "./TopBarLeft";

function SidePanel(props) {
  return (
    <div className="sidePanel">
      <TopBarLeft onAdd={props.onAdd}></TopBarLeft>
      <SearchBar></SearchBar>
      {props.notes.map((note) => (
        <p
          key={note.id}
          onClick={props.onSelect}
          id={note.id}
          style={
            props.active !== undefined
              ? parseInt(note.id) === parseInt(props.active.id)
                ? { backgroundColor: "pink" }
                : { backgroundColor: "white" }
              : { backgroundColor: "skyblue" }
          }
        >
          {note.body}
        </p>
      ))}
    </div>
  );
}

export default SidePanel;
