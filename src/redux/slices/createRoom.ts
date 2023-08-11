import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { socket } from '../../socket';


export interface Message {
    status: String,
    stage: String,
    name: String
}

export interface connectPlayers {
    users: Array<Text>
}


export interface roomState {
    name: String,
    players: Number,
    password: String,
    pub: Boolean,
    status: String,
    connectPlayers: Array<Text>,
}


// Начальное значение
const initialState = {
    name: '',
    players: 3,
    password: '',
    pub: false,
    status: '',
    connectPlayers: [],
} as roomState;



//Создание комнаты
export const createRoomAsync = createAsyncThunk(
    'rooms/createRoom',
    async (room: roomState) => {
        return new Promise<Message>((resolve, reject) => {
            // socket.connect();
            console.log('createroom');
            socket.emit('create', room);
        });
    }
);


const createRoomSlice = createSlice({
    name: 'create',
    initialState,
    // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
    reducers: {
        createRoom: (state, action) => {
            // changeVisible(action.payload);
            console.log('createRoom', action.payload.name);
            state.name = action.payload.name
        },
        updatePlayers: (state, action) => {
            // changeVisible(action.payload);
            console.log('updatePlayers', action.payload);
            state.connectPlayers = action.payload
        },
        // пример с данными
        // incrementByAmount: (state, action) => {
        //   state.value += action.payload;
        // },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(createRoomAsync.fulfilled, (state, action) => {
    //         debugger
    //         state.status = action.payload.status;
    //         console.log('extra', action.payload);
    //     })
    // }
});


// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { createRoom, updatePlayers } = createRoomSlice.actions;


// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default createRoomSlice.reducer;
