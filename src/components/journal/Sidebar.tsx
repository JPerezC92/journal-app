import { useDispatch, useSelector } from "react-redux";
import { useAuthentication } from "../../hooks";
import { startNewNote } from "../../reducers/notesReducer/notesThunks";
import { RootState } from "../../store/store";
import JournalEntries from "./JournalEntries";

const Sidebar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.authReducer);
  const { displayName } = auth.user;

  const authenticationHook = useAuthentication();

  const handleAddNewEntry = () => {
    dispatch(startNewNote());
  };

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar mt-1">
        <h3>
          <i className="far fa-moon"> </i>
          <span> {displayName}</span>
        </h3>

        <button
          type="button"
          className="btn"
          onClick={authenticationHook.handleLogout}
        >
          Logout
        </button>
      </div>
      <div
        aria-label="button"
        className="journal__new-entry"
        onClick={handleAddNewEntry}
      >
        <i className="far fa-calendar-plus fa-5x"></i>
        <p className="mt-5">New entry</p>
      </div>
      <JournalEntries />
    </aside>
  );
};

export default Sidebar;
