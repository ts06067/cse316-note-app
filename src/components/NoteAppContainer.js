import MainPanel from "./MainPanel";
import SidePanel from "./SidePanel";

import "./css/NoteAppContainer.css";

function NoteAppContainer() {
  const sidePanelButtons = [
    { id: 0, text: "profile" },
    { id: 1, text: "logo" },
    { id: 2, text: "add" },
  ];

  const mainPanelButtons = [
    { id: 0, text: "none" },
    { id: 1, text: "none" },
    { id: 2, text: "delete" },
  ];

  return (
    <div className="container">
      <SidePanel items={sidePanelButtons}></SidePanel>
      <MainPanel items={mainPanelButtons}></MainPanel>
    </div>
  );
}
export default NoteAppContainer;
