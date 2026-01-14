import { ReactNode } from "react";
import { IconType } from "react-icons";

interface IconTypografyProps {
  hoverBgColor?: string;
  icon: IconType;
  iconColor?: string;
  text?: string;
  textColor?: string;
  children?: ReactNode;
}

export default function IconTypografy({
  icon: Icon,
  ...props
}: IconTypografyProps) {
  return (
    <div
      className={`flex items-center gap-4 ${props.hoverBgColor} p-1 rounded-md`}
    >
      <Icon size={16} color={props.iconColor} />
      <span>{props.text ? props.text : props.children}</span>
    </div>
  );
}
