import TextBody from "./TextBody";
import "./css/MainPanel.css";
import TopBar from "./TopBar";
import BottomTag from "./BottomTag";

function MainPanel(props) {
  return (
    <div className="mainPanel">
      <TopBar items={props.items}></TopBar>
      <TextBody></TextBody>
      <BottomTag></BottomTag>
    </div>
  );
}

export default MainPanel;
