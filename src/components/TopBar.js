import Button from "./Button";
import "./css/TopBar.css";

function TopBar(props) {
  return (
    <div className="topBar">
      {props.items.map((item) => (
        <Button key={item.id} text={item.text}></Button>
      ))}
    </div>
  );
}

export default TopBar;
