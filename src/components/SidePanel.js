import "./css/SidePanel.css";
import SearchBar from "./SearchBar";
import TopBar from "./TopBar";

function SidePanel(props) {
  return (
    <div className="sidePanel">
      <TopBar items={props.items} onAdd={props.onAdd}></TopBar>
      <SearchBar></SearchBar>
      {props.notes.map((note) => (
        <p
          key={note.id}
          onClick={props.onSelect}
          id={note.id}
          style={
            props.active != undefined
              ? note.id == props.active.id
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
