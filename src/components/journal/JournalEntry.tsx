import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { Note, notesActions } from "../../reducers";

const JournalEntry = (props: { note: Note }) => {
  const dispatch = useDispatch();
  const { title, body, date, imageUrl } = props.note;

  const handleEntryClick = () => {
    dispatch(notesActions.setNoteActive(props.note));
  };

  return (
    <div
      className="journal__entry pointer animate__animated animate__fadeIn animate__faster"
      onClick={handleEntryClick}
    >
      {imageUrl && (
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${imageUrl})`,
          }}
        ></div>
      )}

      {/* <div
        className="journal__entry-picture"
        style={{
          backgroundSize: "cover",
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg)",
        }}
      ></div> */}

      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>
      <div className="journal__entry-date-box">
        <span>{format(date, "eeee")}</span>
        <h4>{format(date, "do")}</h4>
      </div>
    </div>
  );
};

export default JournalEntry;
