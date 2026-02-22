"use client";

import { JSX, useEffect, useRef, useState } from "react";
import { ROOT_DIR, Shell } from "@/core/shell";

enum Keys {
  Enter = "Enter",
  Backspace = "Backspace",
}

export function Terminal() {
  const [history, setHistory] = useState<JSX.Element[]>([]);
  const [input, setInput] = useState<string>("");
  const [cwd, setCwd] = useState<string>(ROOT_DIR);
  const shell = useRef<Shell>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const clear = () => {
    setHistory([]);
    setInput("");
  };

  const getKey = (event: KeyboardEvent) => {
    const args = input.trim().split(" ");
    const acceptedCmd = Shell.isValidCmd(args[0]);
    var print = "";

    if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault();
      clear();
      return;
    }

    if (event.key === Keys.Enter) {
      if (args[0] === "clear") {
        if (!(1 in args)) {
          clear();
          return;
        }
        print = "clear: too many arguments";
      } else {
        if (shell.current) print = shell.current.interpret(args, cwd, setCwd);
      }

      const newEntry = (
        <div key={Date.now()}>
          <div className="mb-1">
            <strong className="text-green-500">
              [zherri@archlinux {cwd}]$&nbsp;
            </strong>
            <strong className={acceptedCmd ? "text-green-500" : "text-red-600"}>
              {input}
            </strong>
          </div>
          <span>
            {acceptedCmd || args[0] === ""
              ? print
              : "invalid command: " + args[0]}
          </span>
        </div>
      );

      setHistory((prev) => [...prev, newEntry]);
      setInput("");
      return;
    }

    if (event.key === Keys.Backspace) {
      setInput((prev) => prev.slice(0, -1));
      return;
    }

    if (event.key.length === 1) {
      event.preventDefault();
      setInput((prev) => prev + event.key);
    }
  };

  useEffect(() => {
    if (Shell.isValidCmd(input.split(" ")[0])) {
      inputRef.current?.classList.remove("text-red-600");
      inputRef.current?.classList.add("text-green-500");
    } else {
      inputRef.current?.classList.remove("text-green-500");
      inputRef.current?.classList.add("text-red-600");
    }

    cursorRef.current?.classList.remove("blink-cursor");
    setInterval(() => {
      cursorRef.current?.classList.add("blink-cursor");
    }, 100);

    window.addEventListener("keydown", getKey);
    return () => window.removeEventListener("keydown", getKey);
  }, [input]);

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
            <strong ref={inputRef}>{input}</strong>
            <strong ref={cursorRef} className="blink-cursor">
              █
            </strong>
          </span>
        </div>
      </div>
    </>
  );
}
