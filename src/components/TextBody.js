import "./css/TextBody.css";

function TextBody(props) {
  return (
    <div className="textBody">
      <textarea
        placeholder="Enter text..."
        onChange={props.onChangeBody}
        value={props.body}
      ></textarea>
    </div>
  );
}

export default TextBody;
