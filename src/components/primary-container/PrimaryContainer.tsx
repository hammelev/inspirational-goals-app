import type { ComponentPropsWithoutRef } from "react";

import styles from "./primary-container.module.css";

type PrimaryContainerProps = ComponentPropsWithoutRef<"div">;

export default function PrimaryContainer({
  children,
  className = "",
  ...props
}: PrimaryContainerProps) {
  return (
    <div {...props} className={`${styles["primary-container"]} ${className}`}>
      {children}
    </div>
  );
}
