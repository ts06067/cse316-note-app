import "./css/NoteItem.css";

function NoteItem(props) {
  return (
    <div
      onClick={props.onClick}
      data-note-id={props.note.id}
      className={
        props.active !== undefined && props.note.id === props.active.id
          ? "item --selected"
          : "item"
      }
    >
      <span style={{ fontSize: 18 }}>
        {formatString(props.note.body)}
        <br></br>{" "}
      </span>
      <span style={{ fontSize: 14 }}>{"\n" + formatDate(props.note.date)}</span>
    </div>
  );
}

function formatString(str) {
  return str.slice(0, 30) + "...";
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
