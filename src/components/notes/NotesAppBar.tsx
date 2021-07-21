import { useDispatch, useSelector } from "react-redux";
import { startSaveNote } from "../../reducers";
import { RootState } from "../../store/store";

const NotesAppBar = () => {
  const { active } = useSelector((state: RootState) => state.notesReducer);

  const dispatch = useDispatch();

  const handleSave = () => {
    if (active) dispatch(startSaveNote(active));
  };

  return (
    <div className="notes__appbar">
      <span>28 Agosto 2021</span>
      <div>
        <button className="btn">Picture</button>
        <button className="btn" onClick={handleSave} type="button">
          Save
        </button>
      </div>
    </div>
  );
};

export default NotesAppBar;
