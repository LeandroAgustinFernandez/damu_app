const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dajilyvt7/";
const uploadPreset = "damu_uploads";

export const uploadFileToCloudinary = async (file, platform) => {
    if (!file) return null;

    const data = new FormData();

    if (platform === "web") {
      const fileBlob = await fetch(file.uri).then((res) => res.blob());
      data.append("file", fileBlob, file.name.replace(/[#-]/g, ""));
    } else {
      data.append("file", {
        uri: file.uri,
        type: file.mimeType || "application/octet-stream",
        name: file.name.replace(/[#-]/g, ""),
      });
    }

    let path = "upload";
    if (file.mimeType === "application/pdf") {
      data.append("resource_type", "raw");
      path = "raw/upload";
    }
    data.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(cloudinaryUrl + path, {
        method: "POST",
        body: data,
      });
      const result = await response.json();

      if (result.error) {
        throw new Error(result.error.message);
      }

      return result.secure_url;
    } catch (error) {
      console.error("Error uploading file:", error);
    //   Alert.alert("Error", "Error uploading file to Cloudinary");
      return null;
    }
  };