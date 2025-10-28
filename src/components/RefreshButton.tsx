import type { ComponentPropsWithoutRef } from "react";

import styles from "./refresh-button.module.css";

type RefreshButtonProps = Omit<ComponentPropsWithoutRef<"button">, "children">;

export default function RefreshButton({
  className = "",
  ...props
}: RefreshButtonProps) {
  return (
    <button
      {...props}
      className={`material-symbols-outlined ${styles["refresh-button"]} ${className}`}
    >
      autorenew
    </button>
  );
}
