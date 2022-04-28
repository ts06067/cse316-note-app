import "./css/NoteItem.css";

function NoteItem(props) {
  const isSimilar = props.similarityIdx > 0.5;
  return (
    <div
      onClick={props.onClick}
      data-note-id={props.note._id}
      className={
        props.active !== undefined && props.note._id === props.active._id
          ? "item --selected"
          : isSimilar
          ? "item --similar"
          : "item"
      }
    >
      <span style={{ fontSize: 18 }}>
        {formatString(props.note.text)}
        <br></br>{" "}
      </span>
      <span style={{ fontSize: 14 }}>
        {"\n" + formatDate(props.note.lastUpdatedDate)}
      </span>
    </div>
  );
}

function formatString(str) {
  return str.length >= 25
    ? str.slice(0, 25) + "..."
    : str.length > 0
    ? str
    : "No Text";
}

function formatDate(date) {
  const d = new Date(date);

  const month = d.getMonth();
  const day = d.getDate();
  const year = d.getFullYear();
  const hour = d.getHours();
  const min = d.getMinutes();
  const sec = d.getSeconds();
  const ampm = hour >= 12 ? "PM" : "AM";

  return `${month + 1}/${day}/${year} ${hour}:${min < 10 ? "0" + min : min}:${
    sec < 10 ? "0" + sec : sec
  } ${ampm}`;
}

export default NoteItem;
