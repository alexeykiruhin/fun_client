import React, { useState } from 'react';
import styles from './ItemList.module.css';


type PropTypes = {
  name: string | number,
  click: boolean,
  setClick: Function,
  setArrRoom: Function,
  // arrRoom: Set<number | string>,
  arrRoom: string,
  id: string
};


const ItemList: React.FC<PropTypes> = ({ name, setArrRoom, arrRoom, id }) => {
  const [nameC, setNameC] = useState(true)

  const handleClick = (e: any) => {
    console.log(e.target.className);
    // e.currentTarget.className = 'ListItemClick';
    // if (!click) {
    //   setNameC(!nameC);
    //   setClick(!click);
    //   console.log(e.currentTarget);
    // }
    if (arrRoom === id) {
      console.log('RAVNI');

      setArrRoom('');
    } else {
      setNameC(!nameC);
      setArrRoom(id);
    }
  };

  return (
    <div className={arrRoom !== id ? styles.itemList : styles.itemListClick}
      onClick={handleClick}
    // onClick={handleClick}
    >{name}
    </div>
  );
}

export default ItemList;