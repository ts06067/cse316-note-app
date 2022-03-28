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
        search={props.search}
        onChangeSearch={props.onChangeSearch}
      ></SearchBar>
      <div className="noteListWrapper" style={{ height: props.height - 100 }}>
        {props.notes &&
          props.notes.map(
            (note) =>
              matchStr(note.text, props.search) && (
                <NoteItem
                  key={note._id}
                  onClick={props.onSelect}
                  note={note}
                  active={props.active}
                ></NoteItem>
              )
          )}
      </div>
    </div>
  );
}

function matchStr(s1, s2) {
  return s1.toLowerCase().indexOf(s2.toLowerCase()) !== -1;
}

export default SidePanel;
