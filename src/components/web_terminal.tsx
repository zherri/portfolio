"use client";

import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { WebContainer } from "@webcontainer/api";
import "@xterm/xterm/css/xterm.css";

export default function WebTerminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const webcontainerInstance = useRef<WebContainer | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      fontFamily: "JetBrainsMono Nerd Font Mono, monospace",
      fontSize: 18,
      fontWeight: "bold",
      theme: {
        black: "#000000",
        red: "#FF0000",
        green: "#00FF00",
        yellow: "#FFFF00",
        blue: "#00FF00",
        cyan: "#00FF00",
        white: "#00FF00",
        magenta: "#00FF00",
        brightBlack: "#000000",
        brightRed: "#FF0000",
        brightGreen: "#00FF00",
        brightYellow: "#FFFF00",
        brightBlue: "#00FF00",
        brightCyan: "#00FF00",
        brightWhite: "#00FF00",
        brightMagenta: "#00FF00",
        
        background: "#000000",
        foreground: "#00FF00",
        cursor: "#00FF00",
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();

    async function initWebContainer() {
      const instance = await WebContainer.boot();
      webcontainerInstance.current = instance;

      await instance.mount({
        myportfolio: {
          directory: {
            "hello.txt": {
              file: { contents: "Olá, mundo!" },
            },
          },
        },
      });

      const shellProcess = await instance.spawn("jsh", {
        terminal: {
          cols: term.cols,
          rows: term.rows,
        },
        cwd: "myportfolio",
      });

      const input = shellProcess.input.getWriter();
      term.onData((data) => {
        input.write(data);
      });

      shellProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            term.write(data);
          },
        }),
      );

      window.addEventListener("resize", () => {
        fitAddon.fit();
        shellProcess.resize({
          cols: term.cols,
          rows: term.rows,
        });
      });
    }

    initWebContainer();

    return () => {
      term.dispose();
    };
  }, []);

  return (
    <div className="p-4 bg-black w-full h-full overflow-hidden">
      <div ref={terminalRef} className="h-full w-full" />
    </div>
  );
}
