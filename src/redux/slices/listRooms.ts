import { createSlice } from '@reduxjs/toolkit';

export interface RoomState {
    name: string;
    id: number | null;
}

export interface ListRoomsState {
    rooms: RoomState[];
}

// Начальное значение
const initialState = {
    rooms: [
        { name: '', id: null}
    ]
} as ListRoomsState;

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