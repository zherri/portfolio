import { ReactNode, Ref } from "react";

interface DropdownProps {
  ref: Ref<HTMLDivElement>;
  children: ReactNode;
}
export function Dropdown(props: DropdownProps) {
  return <div ref={props.ref}>{props.children}</div>;
}

interface DropdownMenuProps {
  isOpen: boolean;
  children: ReactNode;
}

export function DropdownMenu(props: DropdownMenuProps) {
  return (
    <div
      className={`absolute ${props.isOpen ? "opacity-100" : "opacity-0"} transition-all
                  bg-neutral-800 border-2 border-red-700 shadow-lg shadow-red-700/40 rounded-md p-2`}
    >
      {props.children}
    </div>
  );
}
