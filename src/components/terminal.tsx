"use client";

import { JSX, useEffect, useState } from "react";

export function Terminal() {
  const [history, setHistory] = useState<JSX.Element[]>([]);
  const [args, setArgs] = useState<string>("");

  useEffect(() => {
    const takeKey = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (args === "clear") {
          setHistory([]);
          setArgs("");
          return;
        }
        const newEntry = (
          <div key={Date.now()}>
            <div className="mb-1">
              <strong className="text-[#1FCA00]">-&gt;&nbsp;</strong>
              <strong className="text-[#15CCCC]">myinfo&nbsp;</strong>
              <span>{args}</span>
            </div>
            <span>{args === "ls" ? "" : "invalid command: " + args}</span>
          </div>
        );

        setHistory((prev) => [...prev, newEntry]);
        setArgs("");
        return;
      }

      if (event.key === "Backspace") {
        setArgs((prev) => prev.slice(0, -1));
        return;
      }

      if (event.key.length === 1) {
        event.preventDefault();
        setArgs((prev) => prev + event.key);
      }
    };

    window.addEventListener("keydown", takeKey);
    return () => window.removeEventListener("keydown", takeKey);
  }, [args]);

  return (
    <>
      <div className="max-w-full w-full h-3/4 p-4 bg-neutral-900/50 rounded-3xl wrap-break-word">
        {history}
        <div className="flex flex-wrap break-all">
          <strong className="text-[#1FCA00]">-&gt;&nbsp;</strong>
          <strong className="text-[#15CCCC]">myinfo&nbsp;</strong>
          <span>
            {args}
            <strong className="blink-cursor">│</strong>
          </span>
        </div>
      </div>
    </>
  );
}
