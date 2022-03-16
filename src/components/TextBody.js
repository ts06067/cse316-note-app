import "./css/TextBody.css";

function TextBody(props) {
  return (
    <div className="textBody">
      <textarea
        placeholder="Enter text..."
        onChange={props.onChangeBody}
        onBlur={props.onEdit}
        value={props.body}
      ></textarea>
    </div>
  );
}

export default TextBody;
