import "./css/Button.css";

function Button(props) {
  return (
    <div className="button" onClick={() => console.log("a")}>
      {props.onClick}
    </div>
  );
}

export default Button;
