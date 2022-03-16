function NoteItem(props) {
  if (props.active !== undefined) {
    if (props.note.id === props.active.id) {
      return (
        <div onClick={props.onClick} id={props.note.id}>
          <h2 id={props.note.id}>{props.note.body}</h2>
          <p id={props.note.id}>{props.note.date}</p>
        </div>
      );
    }
  }
  return (
    <div onClick={props.onClick} id={props.note.id}>
      <h3 id={props.note.id}>{props.note.body}</h3>
      <p id={props.note.id}>{props.note.date}</p>
    </div>
  );
}

export default NoteItem;
