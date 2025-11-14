import styles from "./loading-indicator.module.css";

type LoadingIndicatorProps = {
  size?: "small" | "large";
  isContainerLoader?: boolean;
};

export default function LoadingIndicator({
  size,
  isContainerLoader = false,
}: LoadingIndicatorProps) {
  const overlayClasses = [
    styles["loading-overlay"],
    isContainerLoader && styles["container-loader"],
  ]
    .filter(Boolean)
    .join("");

  const indicatorClasses = [styles["loading-indicator"], size && styles[size]]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={overlayClasses} aria-label="Loading content" role="status">
      <div className={indicatorClasses} aria-hidden="true" />
    </div>
  );
}
