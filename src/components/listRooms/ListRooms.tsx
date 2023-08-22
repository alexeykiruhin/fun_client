import React, { useEffect, useState } from 'react';
import styles from './ListRooms.module.css';
import { Button } from 'antd';
import { changeVisible } from '../../redux/slices/menu';
import ItemList from '../itemList/ItemList';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { listRoomsAsync } from '../../redux/slices/listRooms';
import { RoomState } from '../../redux/slices/listRooms';


const ListRooms: React.FC = () => {
    // const { data, isLoading } = useGetRoomsQuery();
    const [arrRoom, setArrRoom] = useState('');
    // const rm = useConnectRoomQuery(arrRoom);


    const rooms = useAppSelector(state => state.listRooms.rooms);

    const [click, setClick] = useState(false);
    // const [arrRoom, setArrRoom] = useState(new Set<number | string>());
    console.log('data in ListRooms', rooms);


    // const dispatch = useDispatch();
    const dispatch = useAppDispatch()

    const handleBack = () => {
        dispatch(changeVisible('menu'))
    }

    const handleStart = () => {
        console.log('Start', arrRoom);

    }

    useEffect(() => {
        dispatch(listRoomsAsync());
    }, [dispatch])

    return (
        <div className={styles.ListRooms}>
            <div>List Rooms</div>
            {/* <div>Count: {data}</div> */}
            <div className={styles.ListWrap}>
                {/* {isLoading && <div>Loading...</div>} */}
                {/* {rooms.map(r => [r.name, r.id]).map((r, index) => <ItemList
                    key={index}
                    name={r[0]}
                    click={click}
                    setClick={setClick}
                    setArrRoom={setArrRoom}
                    arrRoom={arrRoom}
                    id={r[1].toString()}
                />)} */}
                {rooms.map((r: RoomState, index) => <ItemList
                    key={index}
                    name={r.name}
                    click={click}
                    setClick={setClick}
                    setArrRoom={setArrRoom}
                    arrRoom={arrRoom}
                    id={r.id}
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