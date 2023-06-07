import { ChangeEvent, useCallback, useState } from "react";

export function useInput<T>(initialValue: T) {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value as T),
    []
  );
  return [{ value, onChange }, setValue] as const;
}
