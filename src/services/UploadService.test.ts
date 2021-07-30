import { UploadService } from "./UploadService";
import cloudinary from "cloudinary";

(cloudinary as any).config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
  secure: true,
});

describe("Test o UploadService", () => {
  test("should upload a file and return a Url", async () => {
    const resp = await fetch(
      `https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png`
    );
    const blob = await resp.blob();
    const file = new File([blob], "foto.png");
    const url = await UploadService.image(file);

    expect(typeof url).toBe("string");
    // delete image by id
    const segments = url!.split("/");
    const imageId = segments[segments.length - 1].replace(".png", "");

    cloudinary.v2.api.delete_resources([imageId], {}, () => {});
  });

  test("should return null", async () => {
    const file = new File([], "foto.png");
    const url = await UploadService.image(file);

    expect(url).toBe(null);
  });
});
