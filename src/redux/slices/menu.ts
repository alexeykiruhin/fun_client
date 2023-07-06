import { createSlice } from '@reduxjs/toolkit';

export interface MenuState {
    visible: String
}

// Начальное значение
const initialState = {
    visible: 'menu',
} as MenuState;

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
    reducers: {
        changeVisible: (state, action) => {
            state.visible = action.payload;
        },
        // пример с данными
        // incrementByAmount: (state, action) => {
        //   state.value += action.payload;
        // },
    },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { changeVisible } = menuSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default menuSlice.reducer;