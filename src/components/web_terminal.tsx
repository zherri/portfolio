"use client";

import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { initWebContainer } from "@/lib/webcontainer";
import "@xterm/xterm/css/xterm.css";

export default function WebTerminal() {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      fontFamily: "VT323, monospace",
      fontSize: 28,
      lineHeight: 1,
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

    initWebContainer(term, fitAddon);

    return () => {
      term.dispose();
    };
  }, []);

  return (
    <div className={`p-4 bg-black w-full h-full overflow-hidden tracking-tighter whitespace-pre-wrap oldstyle-nums`}>
      <div ref={terminalRef} className="h-full w-full" />
    </div>
  );
}
