import { Terminal } from "@/components/terminal";
import IconTypografy from "@/components/icon_typografy";
import { FaInfoCircle } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <div className="flex flex-col w-full h-full py-4 px-20 gap-2">
        <Terminal />
        <div className="w-full p-4 border border-red-700 shadow-lg shadow-red-700/50 bg-neutral-900/50 rounded-3xl">
          <IconTypografy icon={FaInfoCircle} iconColor="red">
            <span>
              This is a{" "}
              <strong className="text-red-600">interactive terminal</strong> for
              show my about. You can test it{" "}
              <strong className="text-red-600">writing the commands</strong>{" "}
              below:
            </span>
            <br />
            <span>
              - <strong className="text-red-600">ls</strong>: Show directories
              and files of the current folder.
            </span>
            <br />
            <span>
              - <strong className="text-red-600">cat</strong> [
              <strong className="text-red-600">FILE</strong>]: Show content
              inside a given file.
            </span>
          </IconTypografy>
        </div>
      </div>
    </>
  );
}
