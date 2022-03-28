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
      <SearchBar
        searchRef={props.searchRef}
        onChangeSearch={props.onChangeSearch}
      ></SearchBar>
      <div className="noteListWrapper" style={{ height: props.height - 100 }}>
        {props.notes &&
          props.notes.map((note) => (
            <NoteItem
              key={note._id}
              onClick={props.onSelect}
              note={note}
              active={props.active}
            ></NoteItem>
          ))}
      </div>
    </div>
  );
}

export default SidePanel;
