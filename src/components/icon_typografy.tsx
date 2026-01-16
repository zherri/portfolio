import { ReactNode } from "react";
import { IconType } from "react-icons";

interface IconTypografyProps {
  icon?: IconType;
  utfIcon?: string;
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
    <div className={`flex items-center gap-4 p-1 rounded-md`}>
      {Icon ? (
        <Icon size={16} color={props.iconColor} />
      ) : (
        <span className={props.textColor}>{props.utfIcon}</span>
      )}
      <span className={props.textColor}>
        {props.text ? props.text : props.children}
      </span>
    </div>
  );
}
