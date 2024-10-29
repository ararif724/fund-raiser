// redux/slices/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
    value: number;
    search: { status: boolean; query: string };
}

// Define the initial state
const initialState: CounterState = {
    value: 0,
    search: { status: false, query: '' },
};

export const headerSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setSearch(state, action) {
            return { ...state, search: { ...state.search, ...action.payload } };
        },
    },
});

export const { setSearch } = headerSlice.actions;

export default headerSlice.reducer;
