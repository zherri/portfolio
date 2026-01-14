"use client";

import { JSX, useEffect, useState } from "react";

export function Terminal() {
  const [history, setHistory] = useState<JSX.Element[]>([]);
  const [cmd, setCmd] = useState<string>("");
  const [cwd, setCwd] = useState<string>("myportfolio");

  const acceptCmds = ["cd", "ls", "cat"];
  const fileSystem: { [key: string]: string[] } = {
    myportfolio: ["󰡯 about.bin", " stacks", " projects", " experience"],
    stacks: [],
    projects: [],
    experience: [],
  };

  useEffect(() => {
    const takeKey = (event: KeyboardEvent) => {
      const args = cmd.includes(" ") ? cmd.split(" ") : [cmd];
      var print = "";

      if (event.key === "Enter") {
        switch (args[0]) {
          case "cd":
            if (!(1 in args)) {
              setCwd("myportfolio");
              break;
            }
            break;

          case "ls":
            print = fileSystem[cwd].join("  ");
            break;

          case "clear":
            setHistory([]);
            setCmd("");
            return;
        }

        const newEntry = (
          <div key={Date.now()}>
            <div className="mb-1">
              <strong className="text-green-500">
                [zherri@archlinux {cwd}]$&nbsp;
              </strong>
              <span>{cmd}</span>
            </div>
            <span>
              {acceptCmds.includes(cmd) ? print : "invalid command: " + args[0]}
            </span>
          </div>
        );

        setHistory((prev) => [...prev, newEntry]);
        setCmd("");
        return;
      }

      if (event.key === "Backspace") {
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

  return (
    <>
      <div className="max-w-full w-full h-full p-4 bg-black rounded-3xl wrap-break-word">
        {history}
        <div className="flex flex-wrap break-all">
          <strong className="text-green-500">
            [zherri@archlinux {cwd}]$&nbsp;
          </strong>
          <span>
            {cmd}
            <strong className="text-green-500 blink-cursor">│</strong>
          </span>
        </div>
      </div>
    </>
  );
}
