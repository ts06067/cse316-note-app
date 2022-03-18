import "./css/BottomTag.css";
import { WithContext as ReactTags } from "react-tag-input";

function BottomTag(props) {
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  return (
    <div className="bottomTag">
      <ReactTags
        tags={props.tags}
        delimiters={delimiters}
        handleAddition={props.onAddTag}
        handleDelete={props.onDeleteTag}
        handleDrag={props.onDragTag}
        inputFieldPosition="bottom"
        autofocus={false}
      ></ReactTags>
    </div>
  );
}

export default BottomTag;
