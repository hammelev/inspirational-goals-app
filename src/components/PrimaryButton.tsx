import type { ComponentPropsWithoutRef } from "react";

import styles from "./primary-button.module.css";

type PrimaryButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "children"
> & {
  iconName?: string;
};

export default function PrimaryButton({
  className = "",
  iconName = "autorenew",
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className={`material-symbols-outlined ${styles["primary-button"]} ${className}`}
    >
      {iconName}
    </button>
  );
}
