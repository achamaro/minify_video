"use client";

import { ChangeEvent, useEffect, useState } from "react";

import minify, { Format, MinifyOptions } from "@/lib/minify";
import { metadata } from "@/lib/video";

import { useInput } from "../hooks/model";
import Progress from "./progress";

export type MinifyProps = {
  file: File;
  resetFile: () => void;
};

const formats = ["webm", "gif", "mp4"] as const;

export default function Minify({ file, resetFile }: MinifyProps) {
  const [fps] = useInput(10);
  const [width] = useInput(640);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [format, setFormat] = useState<Format>("gif");
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
      fps: fps.value,
      width: width.value,
      format,
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

      <dl className="mt-5 grid grid-cols-[auto,1fr] items-center gap-6 [&>dt]:text-right">
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

        <dt>Format</dt>
        <dd className="flex items-center gap-5">
          {formats.map((f) => (
            <label key={f} className="flex items-center gap-1">
              <input
                type="radio"
                value={f}
                checked={f === format}
                onChange={({
                  target: { value },
                }: ChangeEvent<HTMLInputElement>) =>
                  setFormat(value as (typeof formats)[number])
                }
              />
              {f}
            </label>
          ))}
        </dd>
      </dl>

      <Progress open={progressOpened} progress={progress} />
    </section>
  );
}
