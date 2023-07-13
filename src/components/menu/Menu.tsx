import React from 'react';
import styles from './Menu.module.css';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { changeVisible } from '../../redux/slices/menu';


const Menu = () => {

  const dispatch = useDispatch();

  const handleNew = () => {
    console.log('Click!');
    dispatch(changeVisible('createGame'))
  }

  const handleConnect = () => {
    console.log('Click!');
    dispatch(changeVisible('listRooms'))
  }

  return (
    <div className={styles.Menu}>
      <Button block size='large' onClick={handleNew}>
        New
      </Button>
      <Button block size='large' onClick={handleConnect}>
        Connect
      </Button>
    </div>
  );
}

export default Menu;