// Components
import BackgroundImage from "../features/background-images/BackgroundImage";
import InspirationalQuotes from "../features/inspirational-quotes/InspirationalQuotes";
import Weather from "../features/weather/Weather";
import styles from "./app.module.css";

function App() {
  return (
    <div className={styles.app}>
      <BackgroundImage />
      <InspirationalQuotes />
      <Weather />
    </div>
  );
}

export default App;
