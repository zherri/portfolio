"use client";

import { Terminal } from "@/components/terminal";
import IconTypografy from "@/components/icon_typografy";
import { FaAngleUp, FaInfoCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

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
      <Terminal />
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
        className={`absolute w-[90%] p-4 border border-green-700 shadow-lg shadow-green-800/50 bg-black rounded-2xl
                    ${showHelp ? "opacity-100 bottom-8" : "opacity-0 bottom-0"} transition-all duration-200`}
      >
        <IconTypografy icon={FaInfoCircle} iconColor="green">
          <span>
            This is a{" "}
            <strong className="text-green-500">
              interactive terminal emulator
            </strong>{" "}
            for show my <strong className="text-green-500">portfolio</strong> in
            a different way. You can test it{" "}
            <strong className="text-green-500">writing the commands</strong>{" "}
            below:
          </span>
          <br />
          <span>
            - <strong className="text-green-500">cd</strong> [
            <strong className="text-green-500">DIR</strong>]: Access a given
            directory (You can type "cd .." to go one folder higher in the files
            hierarchy).
          </span>

          <br />
          <span>
            - <strong className="text-green-500">ls</strong>: Show directories
            and files of the current folder.
          </span>
          <br />
          <span>
            - <strong className="text-green-500">cat</strong> [
            <strong className="text-green-500">FILENAME</strong>]: Show content
            inside a given file, except for binaries in this experience, of
            course.
          </span>
          <br />
          <span>
            - <strong className="text-green-500">./</strong>[
            <strong className="text-green-500">BIN FILENAME</strong>]: Pattern
            to execute binary file.
          </span>
        </IconTypografy>
      </div>
    </div>
  );
}
