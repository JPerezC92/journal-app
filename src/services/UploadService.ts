export class UploadService {
  static async image(file: File) {
    const cloudUrl = "https://api.cloudinary.com/v1_1/jperezc92/upload";

    const formData = new FormData();
    formData.append("upload_preset", "react-journal");
    formData.append("file", file);

    try {
      const resp = await fetch(cloudUrl, { method: "POST", body: formData });

      if (resp.ok) {
        const cloudResp = await resp.json();

        return cloudResp.secure_url as string;
      } else {
        // throw await resp.json();
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
