"use client";

import { useEffect, useRef, useState } from "react";
import { FaAngleUp, FaInfoCircle } from "react-icons/fa";
import IconTypografy from "@/components/icon_typografy";
import WebTerminal from "@/components/web_terminal";

export default function Home() {
  const [showHelp, setShowHelp] = useState<boolean>(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    stopTimer();
    timeoutRef.current = setTimeout(() => setShowHelp(false), 10000);
  };

  const stopTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-full">
      <WebTerminal />
      <div
        className={`absolute bottom-0 ${showHelp ? "opacity-0" : "opacity-100"} transition-transform animate-bounce transform
                    flex flex-col items-center justify-center z-50`}
      >
        <FaAngleUp size={42} color="green" />
      </div>
      <div
        onMouseEnter={() => {
          stopTimer();
          setShowHelp(true);
        }}
        onMouseLeave={() => startTimer()}
        className={`absolute w-[90%] p-4 border border-[#00FF00] shadow-lg shadow-green-400/50 bg-black rounded-2xl
                    ${showHelp ? "opacity-100 bottom-8" : "opacity-0 bottom-0"} transition-all duration-200`}
      >
        <IconTypografy icon={FaInfoCircle} iconColor="green">
          <span>
            This is a{" "}
            <strong className="text-[#00FF00]">interactive terminal</strong> for
            show my <strong className="text-[#00FF00]">portfolio</strong> in a
            different way. You can test it{" "}
            <strong className="text-[#00FF00]">writing the commands</strong>{" "}
            below:
          </span>
          <br />
          <span>
            - <strong className="text-[#00FF00]">cd</strong> [
            <strong className="text-[#00FF00]">DIR</strong>]: Access a given
            directory (You can type "cd .." to go one folder higher in the files
            hierarchy).
          </span>

          <br />
          <span>
            - <strong className="text-[#00FF00]">ls</strong>: Show directories
            and files of the current folder.
          </span>
          <br />
          <span>
            - <strong className="text-[#00FF00]">cat</strong> [
            <strong className="text-[#00FF00]">FILENAME</strong>]: Show content
            inside a given file, except for binaries in this experience, of
            course.
          </span>
          <br />
          <span>
            - <strong className="text-[#00FF00]">./</strong>[
            <strong className="text-[#00FF00]">BIN FILENAME</strong>]: Pattern
            to execute binary file.
          </span>
        </IconTypografy>
      </div>
    </div>
  );
}
