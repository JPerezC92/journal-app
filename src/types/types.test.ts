import { Types } from "./types";

describe("test on notesThunks file", () => {
  test("should match the object", () => {
    expect(Types).toEqual({
      AUTH_LOGIN: "[Auth] LOGIN",
      AUTH_LOGOUT: "[Auth] LOGOUT",
      AUTH_REGISTER: "[Auth] REGISTER",

      NOTES_START_NEW_NOTE: "[Notes] START_NEW_NOTE",
      NOTES_START_LOADING_NOTES: "[Notes] START_LOADING_NOTES",
      NOTES_START_SAVE_NOTE: "[Notes] START_SAVE_NOTE",
      NOTES_START_UPLOADING_IMG: "[Notes] START_UPLOADING_IMG",
      NOTES_START_DELETE_NOTE: "[Notes] START_DELETE_NOTE",
    });
  });
});
