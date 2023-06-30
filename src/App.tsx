import React from 'react';
import styles from './App.module.css';
import Menu from './components/menu/Menu';

const App = () => {
  return (
    <div className={styles.App}>
      <Menu />
    </div>
  );
}

export default App;
