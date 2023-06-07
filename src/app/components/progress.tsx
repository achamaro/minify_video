import { useEffect, useRef } from "react";

export type ProgressProps = { open?: boolean; progress: number };
export default function Progress({ open, progress }: ProgressProps) {
  const el = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open) {
      el.current?.showModal();
    } else {
      el.current?.close();
    }
  }, [open]);
  return (
    <dialog
      ref={el}
      className="rounded border border-white/40 bg-white/30 p-4 outline-none  backdrop:blur"
    >
      <p className="mb-3 leading-none ">
        Processing
        <span className="inline-block animate-bounce">.</span>
        <span className="animation-delay-75 inline-block animate-bounce">
          .
        </span>
        <span className="animation-delay-150 inline-block animate-bounce">
          .
        </span>
      </p>
      <div className="relative w-[200px] overflow-hidden rounded bg-gray-300">
        <div
          className="skeleton relative h-2 rounded bg-sky-600 transition-all duration-500 before:opacity-70"
          style={{
            width: `${Math.min(100, Math.round(progress * 100 * 3))}%`,
          }}
        ></div>
      </div>
    </dialog>
  );
}
