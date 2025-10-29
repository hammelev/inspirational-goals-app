import type { ComponentPropsWithoutRef } from "react";

import styles from "./button.module.css";

type ButtonProps = Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  variant: "primary" | "secondary" | "destructive";
  iconName: string;
};

export default function Button({
  className = "",
  iconName,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`material-symbols-outlined ${styles.button} ${styles[variant]} ${className}`}
    >
      {iconName}
    </button>
  );
}
