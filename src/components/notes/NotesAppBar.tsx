import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploadingImg } from "../../reducers";
import { RootState } from "../../store/store";

const NotesAppBar = () => {
  const { active } = useSelector((state: RootState) => state.notesReducer);

  const dispatch = useDispatch();

  const handleSave = () => {
    if (active) dispatch(startSaveNote(active));
  };

  const handleUploadImage = () => {
    document.getElementById("imageSelector")?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0] || null;

    if (file) dispatch(startUploadingImg(file));
  };

  return (
    <div className="notes__appbar">
      <span>28 Agosto 2021</span>

      <input
        type="file"
        name="imageSelector"
        id="imageSelector"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div>
        <button className="btn" onClick={handleUploadImage} type="button">
          Picture
        </button>
        <button className="btn" onClick={handleSave} type="button">
          Save
        </button>
      </div>
    </div>
  );
};

export default NotesAppBar;
