import { IconType } from "react-icons";
import IconTypografy from "@/components/icon_typografy";

interface ButtonProps {
  icon: IconType;
  text: string;
  onClick: () => void;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={`flex justify-center items-center gap-2 hover:shadow-lg shadow-red-800/50 rounded-lg p-1 
                  cursor-pointer hover:bg-red-800 transition-all`}
    >
      <IconTypografy icon={props.icon} text={props.text} />
    </button>
  );
}
