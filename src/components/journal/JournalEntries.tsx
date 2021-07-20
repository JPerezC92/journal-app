import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import JournalEntry from "./JournalEntry";

const JournalEntries = () => {
  const { notes } = useSelector((state: RootState) => state.notesReducer);

  return (
    <div className="journal__entries">
      {notes.map((note) => (
        <JournalEntry key={note.id} note={note} />
      ))}
    </div>
  );
};

export default JournalEntries;
