import cloudinary from "cloudinary";
import { NotesService } from "../../services";
import { store } from "../../store/store";
import { authActions, startLogout } from "../authReducer";
import { startNewNote, startUploadingImg } from "./notesThunks";

(cloudinary as any).config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
  secure: true,
});

describe("Test on notesThunks", () => {
  let dispatch = store.dispatch;
  let state = store.getState();

  beforeEach(() => {
    dispatch(authActions.login({ displayName: "Test", uid: "TESTING" }));
    dispatch = store.dispatch;
    state = store.getState();
  });

  afterEach(async () => {
    await dispatch(startLogout());
  });

  test("startUploadingImg should update the urlImage of the active note", async () => {
    const resp = await fetch(
      `https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png`
    );
    const blob = await resp.blob();
    const file = await new File([blob], "foto.png");

    await dispatch(startNewNote());
    await dispatch(startUploadingImg(file));

    state = store.getState();

    expect(typeof state.notesReducer.active?.imageUrl!).toBe("string");

    const url = state.notesReducer.active?.imageUrl!;
    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".png", "");

    cloudinary.v2.api.delete_resources([imageId], {}, () => {});
    await NotesService.delete("TESTING", state.notesReducer.active?.id!);
  }, 99999);
});
