import { IconType } from "react-icons";

interface ButtonProps {
  icon: IconType;
  text: string;
  onClick: () => void;
}

export default function Button({ icon: Icon, ...props }: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={`flex justify-center items-center gap-2 hover:shadow-lg shadow-red-800/50 rounded-lg p-2 
                  cursor-pointer hover:bg-red-800 transition-all`}
    >
      <Icon size={16} />
      <span>{props.text}</span>
    </button>
  );
}
