export function metadata(file: File): Promise<[number, number]> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.onloadedmetadata = (evt) => {
      URL.revokeObjectURL(url);
      resolve([video.videoWidth, video.videoHeight]);
    };
    video.src = url;
    video.load();
  });
}
