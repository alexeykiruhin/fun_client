import React from "react";
import styles from './game_stage_1.module.css';
import { useAppSelector } from "../../hooks";
import { Button } from "antd";

const GameStage1: React.FC = () => {
    console.log("STAGE 1");
    const players = useAppSelector(state => state.createRoom.connectPlayers);
    const nameRoom = useAppSelector(state => state.createRoom.name);

    
    const handleExit = () => {
        console.log('exit');
        // dispatch(changeVisible('menu'))
    }



    return (
        <div className={styles.stage_1_wrapper}>
            <h3>{nameRoom}</h3>
            <h4>Ожидаем игроков:</h4>

            {players?.map((p, index) => (
                <div key={index}>
                    <span>{String(p)}</span>
                </div>
            ))}

            <Button type="default" onClick={handleExit}>
                Exit
            </Button>
        </div>
    )
}

export default GameStage1;