import "./css/TextBody.css";

function TextBody(props) {
  return (
    <div className="textBody">
      <textarea
        ref={props.body}
        placeholder="Enter text..."
        onBlur={props.onEdit}
      ></textarea>
    </div>
  );
}

export default TextBody;
