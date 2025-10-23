// Components
import BackgroundImage from '../features/background-images/BackgroundImage';
import InspirationalQuotes from '../features/inspirational-quotes/InspirationalQuotes';

import styles from './App.module.css';

function App() {

  return (
    <>
      <div className={styles['top-bar']}>
        <InspirationalQuotes />
      </div>
      <BackgroundImage />
      
    </>
  )
}

export default App
