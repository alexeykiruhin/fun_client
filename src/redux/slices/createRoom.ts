import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { socket } from '../../socket';
import { changeVisible } from './menu';
import { log } from 'console';


export interface Message {
    status: String,
    stage: String
}


export interface roomState {
    name: String,
    players: Number,
    password: String,
    pub: Boolean,
    status: String
}


// Начальное значение
const initialState = {
    name: '',
    players: 3,
    password: '',
    pub: false,
    status: ''
} as roomState;



//Создание комнаты
export const createRoomAsync = createAsyncThunk(
    'rooms/createRoom',
    async (room: roomState) => {
        return new Promise<Message>((resolve, reject) => {
            socket.connect();
            socket.emit('create', room);
        });
    }
);


const createRoomSlice = createSlice({
    name: 'create',
    initialState,
    // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
    reducers: {
        createRoom: (state, action: { payload: roomState }) => {
            // changeVisible(action.payload);
            console.log('createRoom', action.payload);

        },
        // пример с данными
        // incrementByAmount: (state, action) => {
        //   state.value += action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(createRoomAsync.fulfilled, (state, action) => {
            debugger
            state.status = action.payload.status;
            console.log('extra', action.payload);
        })
    }
});


// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { createRoom } = createRoomSlice.actions;


// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default createRoomSlice.reducer;
