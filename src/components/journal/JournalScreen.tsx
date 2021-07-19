import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import NoteScreen from "../notes/NoteScreen";
import NothingSelected from "./NothingSelected";
import Sidebar from "./Sidebar";

const JournalScreen = () => {
  const { active } = useSelector((state: RootState) => state.notesReducer);
  return (
    <div className="journal__main-content">
      <Sidebar />

      <main>{active ? <NoteScreen /> : <NothingSelected />}</main>
    </div>
  );
};

export default JournalScreen;
