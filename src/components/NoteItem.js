function NoteItem(props) {
  return (
    <div
      onClick={props.onClick}
      id={props.note.id}
      className={
        props.active !== undefined && props.note.id === props.active.id
          ? "item --selected"
          : "item"
      }
    >
      {formatString(props.note.body)} <br></br>{" "}
      {"\n" + formatDate(props.note.date)}
    </div>
  );
}

function formatString(str) {
  return str.slice(0, 15) + "...";
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
