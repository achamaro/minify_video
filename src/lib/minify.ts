import { createFFmpeg } from "@ffmpeg/ffmpeg";

export type Format = "webm" | "mp4" | "gif";

const types = {
  webm: "video/webm",
  mp4: "video/mp4",
  gif: "image/gif",
};

export type MinifyOptions = {
  bitrate: number;
  fps: number;
  width: number;
  format: Format;
  onProgress?: (v: { ratio: number }) => void;
};

export default async function minify(
  file: File,
  { bitrate, fps, width, format, onProgress }: MinifyOptions
) {
  const input = file.name;
  const output = file.name.replace(/\.[^\.]+$/, `.${format}`);

  const args = ["-i", input];
  args.push("-b:v", `${bitrate}k`);
  args.push("-r", `${fps}`);
  args.push("-vf", `scale=${width}:-1`);
  args.push(output);

  const ffmpeg = createFFmpeg({
    corePath: new URL("ffmpeg-core.js", window.location.origin).href,
    log: true,
  });

  if (onProgress) {
    ffmpeg.setProgress(onProgress);
  }

  await ffmpeg.load();
  ffmpeg.FS("writeFile", input, new Uint8Array(await file.arrayBuffer()));
  await ffmpeg.run(...args);
  return new File([ffmpeg.FS("readFile", output).buffer], output, {
    type: types[format],
  });
}
