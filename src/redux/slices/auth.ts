import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
    status: boolean
}

// Начальное значение
const initialState = {
    status: false,
} as AuthState;

const authSlice = createSlice({
    name: 'login',
    initialState,
    // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
    reducers: {
        setAuth: (state, action) => {
            state.status = action.payload;
        },
        // пример с данными
        // incrementByAmount: (state, action) => {
        //   state.value += action.payload;
        // },
    },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { setAuth } = authSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default authSlice.reducer;