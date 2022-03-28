import TextBody from "./TextBody";
import "./css/MainPanel.css";
import BottomTag from "./BottomTag";
import TopBarRight from "./TopBarRight";

function MainPanel(props) {
  return (
    <div className="mainPanel" style={props.visible}>
      <TopBarRight
        onBackToList={props.onBackToList}
        onDelete={props.onDelete}
        visible={props.visibleButton}
      ></TopBarRight>
      <TextBody
        onEdit={props.onEdit}
        text={props.text}
        focus={props.focus}
      ></TextBody>
      <BottomTag
        tags={props.tags}
        tagsRef={props.tagsRef}
        onAddTag={props.onAddTag}
        onDeleteTag={props.onDeleteTag}
        onDragTag={props.onDragTag}
      ></BottomTag>
    </div>
  );
}

export default MainPanel;
