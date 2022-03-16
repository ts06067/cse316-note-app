import TextBody from "./TextBody";
import "./css/MainPanel.css";
import BottomTag from "./BottomTag";
import TopBarRight from "./TopBarRight";

function MainPanel(props) {
  return (
    <div className="mainPanel">
      <TopBarRight onDelete={props.onDelete}></TopBarRight>
      <TextBody
        onChangeBody={props.onChangeBody}
        onEdit={props.onEdit}
        body={props.body}
      ></TextBody>
      <BottomTag
        tags={props.tags}
        onAddTag={props.onAddTag}
        onDeleteTag={props.onDeleteTag}
        onDragTag={props.onDragTag}
      ></BottomTag>
    </div>
  );
}

export default MainPanel;
