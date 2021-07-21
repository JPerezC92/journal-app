import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../hooks/useForm/useForm";
import { notesActions } from "../../reducers";
import { RootState } from "../../store/store";
import NotesAppBar from "./NotesAppBar";

const NoteScreen = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector(
    (state: RootState) => state.notesReducer
  );

  const currentNoteId = useRef(note?.id);

  const { formValues, handleInputChange, reset } = useForm({
    body: note?.body || "",
    title: note?.title || "",
  });

  useEffect(() => {
    if (currentNoteId.current !== note!.id) {
      reset({
        body: note?.body || "",
        title: note?.title || "",
      });
      currentNoteId.current = note?.id || "";
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(notesActions.setNoteActive({ ...formValues }));
  }, [formValues, dispatch]);

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          className="notes__title-input"
          type="text"
          placeholder="Some awesome title"
          autoComplete="off"
          value={formValues.title}
          name="title"
          onChange={handleInputChange}
        />

        <textarea
          placeholder="What happened today?"
          className="notes__textarea"
          value={formValues.body}
          name="body"
          onChange={handleInputChange}
        ></textarea>

        {note?.imageUrl && (
          <div className="notes__image">
            <img src={note.imageUrl} alt="imagen" />
          </div>
        )}
      </div>

      <button className="btn btn-danger" type="button">
        Delete
      </button>
    </div>
  );
};

export default NoteScreen;
