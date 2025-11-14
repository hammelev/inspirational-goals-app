import styles from "./primary-container.module.css";

interface PrimaryContainerProps {
  children: React.ReactNode;
  className?: string;
}
export default function PrimaryContainer({
  children,
  className = "",
}: PrimaryContainerProps) {
  return (
    <div className={`${styles["primary-container"]} ${className}`}>
      {children}
    </div>
  );
}
