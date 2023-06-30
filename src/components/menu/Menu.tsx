import React from 'react';
import styles from './Menu.module.css';
import { Button } from 'antd-mobile'

const Menu = () => {
  return (
    <div className={styles.Menu}>
      <Button block size='large'>
        Start
      </Button>
    </div>
  );
}

export default Menu;