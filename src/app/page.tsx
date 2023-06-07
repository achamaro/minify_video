"use client";

import { useCallback, useState } from "react";

import { InputFile } from "./components/input-file";
import Minify from "./components/minify";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const resetFile = useCallback(() => setFile(null), []);

  return (
    <main className="mx-auto flex min-h-screen w-fit flex-col items-center p-24">
      <h1 className="mb-5 text-3xl">Minify Video</h1>

      {file ? (
        <Minify file={file} resetFile={resetFile} />
      ) : (
        <InputFile onInput={setFile} />
      )}
    </main>
  );
}
