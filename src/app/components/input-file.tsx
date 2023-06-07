"use client";

import { cn } from "@/lib/cn";

export type InputFileProps = {
  onInput: (file: File) => void;
  className?: string;
};

export function InputFile({ onInput, className }: InputFileProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      onInput(file);
    }
  }
  return (
    <section className="text-center">
      <label className={cn("cursor-pointer", className)}>
        <input type="file" className="sr-only" onChange={handleChange} />
        <span>Choose a file</span>
      </label>

      <ul className="mt-5 w-[300px] cursor-default whitespace-pre-line text-left text-sm text-gray-400 [&>li]:mt-2 [&>li]:pl-3 [&>li]:before:absolute [&>li]:before:-ml-3 [&>li]:before:content-['-']">
        <li className="">
          このサービスは
          <a
            className="mx-1 underline"
            target="_blank"
            href="https://github.com/ffmpegwasm/ffmpeg.wasm"
            rel="noreferrer"
          >
            ffmpeg.wasm
            <i className="ml-1 align-middle i-[ic/round-open-in-new]"></i>
          </a>
          を使用してお使いのブラウザ上で動画のサイズを縮小するサービスです。
        </li>
        <li>ファイルはどこにも送信されません。</li>
        <li>動画はwebm形式で出力されます。</li>
        <li>入力ファイルのサイズ上限は2GBです。</li>
      </ul>
    </section>
  );
}
