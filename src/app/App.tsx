// Components
import BackgroundImage from "../features/background-images/BackgroundImage";
import GoalsContainer from "../features/goals/GoalsContainer";
import InspirationalQuotes from "../features/inspirational-quotes/InspirationalQuotes";
import Weather from "../features/weather/Weather";
import styles from "./app.module.css";

function App() {
  return (
    <div className={styles.app}>
      <BackgroundImage />
      <InspirationalQuotes />
      <GoalsContainer />
      <Weather />
    </div>
  );
}

export default App;
