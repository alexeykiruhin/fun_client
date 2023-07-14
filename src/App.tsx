import React, { useEffect } from 'react';
import styles from './App.module.css';
import Menu from './components/menu/Menu';
import Game from './components/createGame/createGame';

// import Game from './components/game/Game';

// import hooks
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/slices';
import Header from './components/header/Header';
import ListRooms from './components/listRooms/ListRooms';
import Game_stage_1 from './components/game/game_stage_1';
//import actions
// import { changeVisible } from '../src/slices/menu';

const App = () => {

  const visible = useSelector((state: RootState) => state.menu.visible);

  console.log('visible', visible);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'socket/listenForMessages' });
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.Content}>
        {visible === 'menu' && <Menu />}
        {visible === 'createGame' && <Game />}
        {visible === 'listRooms' && <ListRooms />}
        {visible === 'game_stage_1' && <Game_stage_1 />}
      </div>
    </div>
  );
}

export default App;
