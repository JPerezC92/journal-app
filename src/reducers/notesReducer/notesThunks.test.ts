import { mockStore } from "../../test-utils/mockStore";
import { NotesService, UploadService } from "../../services";
import { notesActions } from "./notesReducer";
import { authActions } from "../authReducer";
import * as notesThunks from "./notesThunks";

describe("Test on notesThunks", () => {
  // setting the state
  let dispatch = mockStore.dispatch;

  const note = {
    id: "Pg8oiE1YVopzEZRGcOos",
    body: "",
    imageUrl: null,
    date: new Date().getTime(),
    title: "",
  };

  dispatch(notesActions.setNoteActive(note));
  dispatch(
    authActions.login({
      displayName: "Test",
      uid: "TESTING_START_UPLOADING_IMAGE",
    })
  );

  test("startUploadingImg should update the urlImage of the active note", async () => {
    const imageUrl =
      "https://res.cloudinary.com/jperezc92/image/upload/v1627334537/az7wmlmgzxwhmhmxytvx.png";
    jest
      .spyOn(UploadService, "image")
      .mockImplementation(() => Promise.resolve(imageUrl));
    jest.spyOn(NotesService, "update").mockImplementation(jest.fn());

    let state = mockStore.getState();

    const resp = await fetch(
      `https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png`
    );
    const blob = await resp.blob();
    const file = new File([blob], "foto.png");

    expect(state.notesReducer.active?.imageUrl).toBeNull();

    await dispatch(notesThunks.startUploadingImg(file));
    state = mockStore.getState();

    expect(UploadService.image).toHaveBeenCalledTimes(1);
    expect(UploadService.image).toHaveBeenCalledWith(file);
    expect(state.notesReducer.active?.imageUrl).toBe(imageUrl);
    expect(NotesService.update).toHaveBeenCalledWith(
      "TESTING_START_UPLOADING_IMAGE",
      {
        body: "",
        date: expect.any(Number),
        id: "Pg8oiE1YVopzEZRGcOos",
        imageUrl: imageUrl,
        title: "",
      }
    );
  });
});
