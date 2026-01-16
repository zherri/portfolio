"use client";

import { JSX, useEffect, useRef, useState } from "react";
import { Shell } from "@/core/shell";

enum Keys {
  Enter = "Enter",
  Backspace = "Backspace",
  Ctrl = "Ctrl",
}

export function Terminal() {
  const shell = new Shell();

  const [history, setHistory] = useState<JSX.Element[]>([]);
  const [cmd, setCmd] = useState<string>("");
  const [cwd, setCwd] = useState<string>("myportfolio");
  const scrollRef = useRef<HTMLDivElement>(null);

  const acceptCmds = ["cd", "ls", "cat"];

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const takeKey = (event: KeyboardEvent) => {
      const args = cmd.includes(" ") ? cmd.split(" ") : [cmd];
      var print = "";

      if (event.key === Keys.Enter) {
        const newEntry = (
          <div key={Date.now()}>
            <div className="mb-1">
              <strong className="text-green-500">
                [zherri@archlinux {cwd}]$&nbsp;
              </strong>
              <span>
                <strong>{cmd}</strong>
              </span>
            </div>
            <span>
              {acceptCmds.includes(args[0])
                ? print
                : "invalid command: " + args[0]}
            </span>
          </div>
        );

        setHistory((prev) => [...prev, newEntry]);
        setCmd("");
        return;
      }

      if (event.key === Keys.Backspace) {
        setCmd((prev) => prev.slice(0, -1));
        return;
      }

      if (event.key.length === 1) {
        event.preventDefault();
        setCmd((prev) => prev + event.key);
      }
    };

    window.addEventListener("keydown", takeKey);
    return () => window.removeEventListener("keydown", takeKey);
  }, [cmd]);

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  return (
    <>
      <div
        ref={scrollRef}
        className="max-w-full max-h-full w-full h-full p-4 overflow-y-auto bg-black wrap-break-word"
      >
        {history}
        <div className="flex flex-wrap break-all">
          <strong className="text-green-500">
            [zherri@archlinux {cwd}]$&nbsp;
          </strong>
          <span>
            <strong>{cmd}</strong>
            <strong className="blink-cursor">│</strong>
          </span>
        </div>
      </div>
    </>
  );
}
