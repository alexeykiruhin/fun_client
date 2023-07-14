import React from 'react';
import styles from './ListRooms.module.css';
import { useGetRoomsQuery } from '../../redux/api';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { changeVisible } from '../../redux/slices/menu';


const ListRooms: React.FC = () => {
  const { data, isLoading } = useGetRoomsQuery();
  console.log('data in ListRooms', data?.rooms);

  const dispatch = useDispatch();

  const handleBack = () => {
    dispatch(changeVisible('menu'))
  }


  return (
    <div className={styles.ListRooms}>
      <div>List Rooms</div>
      {/* <div>Count: {data}</div> */}
      <div className={styles.ListWrap}>
        {isLoading && <div>Loading...</div>}
        {data?.rooms && data?.rooms.map(r => [r.name, r.id]).map((r, index) => <div key={index} className={styles.ListItem}>{r[0]}</div>)}
      </div>
      <div className={styles.BtnWrapper}>
        <Button type="default" htmlType="submit">
          Start
        </Button>

        <Button type="default" onClick={handleBack}>
          Back
        </Button>
      </div>
    </div>
  );
}

export default ListRooms;