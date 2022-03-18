import "./css/SidePanel.css";
import NoteItem from "./NoteItem";
import SearchBar from "./SearchBar";
import TopBarLeft from "./TopBarLeft";

function SidePanel(props) {
  return (
    <div className="sidePanel" style={props.visible}>
      <TopBarLeft
        onAdd={props.onAdd}
        onOpenProfile={props.onOpenProfile}
      ></TopBarLeft>
      <SearchBar></SearchBar>
      {props.notes.map((note) => (
        <NoteItem
          key={note.id}
          onClick={props.onSelect}
          note={note}
          active={props.active}
        ></NoteItem>
      ))}
    </div>
  );
}

export default SidePanel;
