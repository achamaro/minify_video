"use client";

import { useEffect, useState } from "react";

import minify, { MinifyOptions } from "@/lib/minify";
import { metadata } from "@/lib/video";

import { useInput } from "../hooks/model";
import Progress from "./progress";

export type MinifyProps = {
  file: File;
  resetFile: () => void;
};

export default function Minify({ file, resetFile }: MinifyProps) {
  const [bitrate] = useInput(200);
  const [fps] = useInput(20);
  const [width] = useInput(480);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [progress, setProgress] = useState(0);
  const [progressOpened, setProgressOpened] = useState(false);

  useEffect(() => {
    (async () => {
      const [w] = await metadata(file);
      setMaxWidth(w);
    })();
  }, [file, setMaxWidth]);

  async function handleStart() {
    const options: MinifyOptions = {
      bitrate: bitrate.value,
      fps: fps.value,
      width: width.value,
      onProgress: ({ ratio }) => setProgress(ratio),
    };

    setProgress(0);
    setProgressOpened(true);

    const output = await minify(file, options);
    const a = document.createElement("a");
    a.download = output.name;
    a.href = URL.createObjectURL(output);
    a.click();
    URL.revokeObjectURL(a.href);

    resetFile();
  }

  return (
    <section>
      <div className="flex justify-center gap-4">
        <button onClick={handleStart}>start</button>
        <button onClick={resetFile}>reset</button>
      </div>

      <dl className="mt-5 grid grid-cols-[auto,1fr] items-center gap-6 [&>dd]:flex [&>dd]:items-center [&>dd]:gap-3 [&>dt]:text-right">
        <dt>Bitrate (kbps)</dt>
        <dd className="">
          <input type="range" step={10} min={100} max={4000} {...bitrate} />
          <input className="w-[4.5em]" type="text" {...bitrate} />
        </dd>

        <dt>FPS</dt>
        <dd className="flex items-center gap-3">
          <input type="range" step={1} min={10} max={240} {...fps} />
          <input className="w-[4.5em]" type="text" {...fps} />
        </dd>

        <dt>Width</dt>
        <dd className="flex items-center gap-3">
          <input type="range" step={1} min={10} max={maxWidth} {...width} />
          <input className="w-[4.5em]" type="text" {...width} />
        </dd>
      </dl>

      <Progress open={progressOpened} progress={progress} />
    </section>
  );
}
