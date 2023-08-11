import React, { useEffect } from 'react';
import styles from './App.module.css';
import Menu from './components/menu/Menu';
import Game from './components/createGame/createGame';
import { useDispatch } from 'react-redux';
import Header from './components/header/Header';
import ListRooms from './components/listRooms/ListRooms';
import GameStage1 from './components/game/game_stage_1';
import Auth from './components/auth/Auth';
import { useAppSelector } from './hooks';
import { socketListenForMessages } from '../src/redux/cm';
import { changeVisible } from './redux/slices/menu';


//import actions
// import { changeVisible } from '../src/slices/menu';

const App: React.FC = () => {

    const visible = useAppSelector(state => state.menu.visible);
    // const visible = useSelector((state: RootState) => state.menu.visible);

    console.log('visible', visible);

    const dispatch = useDispatch();

    useEffect(() => {
        // проверяю при первой загрузке авторизацию
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            console.log('access_token', access_token);
            // Меняем вью на menu
            dispatch(changeVisible('menu'));
        }

    }, [dispatch]);

    useEffect(() => {
        // dispatch({ type: 'socket/listenForMessages' });
        dispatch(socketListenForMessages());
    }, [dispatch]);

    return (
        <div className={styles.App}>
            <Header />
            <div className={styles.Content}>
                {visible === 'auth' && <Auth />}
                {visible === 'menu' && <Menu />}
                {visible === 'createGame' && <Game />}
                {visible === 'listRooms' && <ListRooms />}
                {visible === 'game_stage_1' && <GameStage1 />}
            </div>
        </div>
    );
}

export default App;
