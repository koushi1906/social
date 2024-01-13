const cloud_name = "dwzbjhaqt";
const upload_preset = "social";

export const uploadToCloudinary = async (pics, fileType) => {
  if (pics && fileType) {
    try {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", upload_preset);
      data.append("cloud_name", cloud_name);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`, {
        method: "post",
        body: data,
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Cloudinary API Error Details:', errorData);
        throw new Error('Failed to upload image.');
      }

      const fileData = await res.json();
      console.log('File Data:', fileData);
      return fileData.url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw new Error('Failed to upload image.');
    }
  } else {
    console.log('Error: Missing pics or fileType');
    throw new Error('Missing pics or fileType');
  }
};
