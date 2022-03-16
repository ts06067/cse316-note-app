import TextBody from "./TextBody";
import "./css/MainPanel.css";
import TopBar from "./TopBar";
import BottomTag from "./BottomTag";

function MainPanel(props) {
  return (
    <div className="mainPanel">
      <TopBar items={props.items} onDelete={props.onDelete}></TopBar>
      <TextBody
        onChangeBody={props.onChangeBody}
        onEdit={props.onEdit}
        body={props.body}
      ></TextBody>
      <BottomTag
        tags={props.tags}
        onAddTag={props.onAddTag}
        onDeleteTag={props.onDeleteTag}
      ></BottomTag>
    </div>
  );
}

export default MainPanel;
