import { ButtonHTMLAttributes, ComponentProps } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
export default function Button(props: ButtonProps) {
  const { className, disabled } = props;
  return (
    <button
      {...props}
      disabled={disabled}
      className="justify-center  flex align-middle p-3 md:h-12 md:w-12 shadow-sm text-sm font-medium rounded-md  hover:bg-red-400 transition-color"
    ></button>
  );
}
