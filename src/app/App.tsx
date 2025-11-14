// Components
import LoadingIndicator from "../components/loading-indicator/LoadingIndicator";
import BackgroundImage from "../features/background-images/BackgroundImage";
import GoalsContainer from "../features/goals/GoalsContainer";
import InspirationalQuotes from "../features/inspirational-quotes/InspirationalQuotes";
import Weather from "../features/weather/Weather";
import { useLoadingState } from "../hooks/useLoadingState";
import styles from "./app.module.css";

function App() {
  const { showGlobalLoader } = useLoadingState();

  return (
    <div className={styles.app}>
      {showGlobalLoader && <LoadingIndicator />}
      <BackgroundImage />
      <InspirationalQuotes />
      <GoalsContainer />
      <Weather />
    </div>
  );
}

export default App;
