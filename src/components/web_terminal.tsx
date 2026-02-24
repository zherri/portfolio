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
      allowTransparency: true,
      theme: {
        black: "#050505",
        red: "#FF0000",
        green: "#33ff33",
        yellow: "#FFFF00",
        blue: "#33ff33",
        cyan: "#33ff33",
        white: "#33ff33",
        magenta: "#33ff33",
        brightBlack: "#050505",
        brightRed: "#FF0000",
        brightGreen: "#33ff33",
        brightYellow: "#FFFF00",
        brightBlue: "#33ff33",
        brightCyan: "#33ff33",
        brightWhite: "#33ff33",
        brightMagenta: "#33ff33",
        background: "#050505",
        foreground: "#33ff33",
        cursor: "#33ff33",
        selectionBackground: "rgba(51, 255, 51, 0.3)",
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();

    initWebContainer(term, fitAddon);

    return () => term.dispose();
  }, []);

  return (
    <div className="bg-black w-full h-full flex items-center justify-center p-4">
      <div className={`crt-overlay w-full h-full rounded-lg shadow-2xl overflow-hidden tracking-tighter
                      whitespace-pre-wrap oldstyle-nums`}>
        <div
          ref={terminalRef}
          className="h-full w-full pl-2 bg-[#050505]"
          style={{ filter: 'contrast(1.2) brightness(1.1)' }}
        />
      </div>
    </div>
  );
}
