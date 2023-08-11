import React, { useState } from 'react';
import styles from './ListRooms.module.css';
import { useGetRoomsQuery } from '../../redux/api';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { changeVisible } from '../../redux/slices/menu';
import ItemList from '../itemList/ItemList';


const ListRooms: React.FC = () => {
    const { data, isLoading } = useGetRoomsQuery();
    const [arrRoom, setArrRoom] = useState('');
    // const rm = useConnectRoomQuery(arrRoom);

    const [click, setClick] = useState(false);
    // const [arrRoom, setArrRoom] = useState(new Set<number | string>());
    console.log('data in ListRooms', data?.rooms);


    const dispatch = useDispatch();

    const handleBack = () => {
        dispatch(changeVisible('menu'))
    }

    const handleStart = () => {
        console.log('Start', arrRoom);
        
    }


    console.log('arrrom', arrRoom.length);

    return (
        <div className={styles.ListRooms}>
            <div>List Rooms</div>
            {/* <div>Count: {data}</div> */}
            <div className={styles.ListWrap}>
                {isLoading && <div>Loading...</div>}
                {data?.rooms && data?.rooms.map(r => [r.name, r.id]).map((r, index) => <ItemList
                    key={index}
                    name={r[0]}
                    click={click}
                    setClick={setClick}
                    setArrRoom={setArrRoom}
                    arrRoom={arrRoom}
                    id={r[1].toString()}
                />)}
            </div>
            <div className={styles.BtnWrapper}>
                <Button
                    type="default"
                    htmlType="submit"
                    disabled={arrRoom.length !== 0 ? false : true}
                    onClick={handleStart}
                >
                    Connect
                </Button>

                <Button type="default" onClick={handleBack}>
                    Back
                </Button>
            </div>
        </div>
    );
}

export default ListRooms;