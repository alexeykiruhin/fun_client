import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { socket } from '../../socket';

export interface RoomState {
    name: string;
    id: string;
}

export interface ListRoomsState {
    rooms: Array<RoomState>;
}

// Начальное значение
const initialState = {
    rooms: []
} as ListRoomsState;

//Получить список комнат
export const listRoomsAsync = createAsyncThunk(
    'rooms/listRooms',
    async () => {
        return new Promise<ListRoomsState>((resolve, reject) => {
            // socket.connect();
            console.log('get_list_rooms');
            socket.emit('get_list_rooms');
        });
    }
);

const listRoomsSlice = createSlice({
    name: 'menu',
    initialState,
    // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
    reducers: {
        setList: (state, action) => {
            state.rooms = action.payload;
        },
        // пример с данными
        // incrementByAmount: (state, action) => {
        //   state.value += action.payload;
        // },
    },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { setList } = listRoomsSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default listRoomsSlice.reducer;