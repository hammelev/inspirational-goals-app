import styles from "./loading-indicator.module.css";

type LoadingIndicatorProps = {
  size?: "small" | "large";
  isContainerLoader?: boolean;
};

export default function LoadingIndicator({
  size,
  isContainerLoader = false,
}: LoadingIndicatorProps) {
  const sizeClass = size ? styles[size] : "";
  const containerLoaderClass = isContainerLoader
    ? styles["container-loader"]
    : "";

  return (
    <div className={`${styles["loading-overlay"]} ${containerLoaderClass}`}>
      <div className={`${styles["loading-indicator"]} ${sizeClass}`} />
    </div>
  );
}
