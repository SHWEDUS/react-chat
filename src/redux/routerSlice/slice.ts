import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RouterSliceState } from './types';

const initialState: RouterSliceState = {
	path: '/'
};

export const routerSlice = createSlice({
	name: 'router',
	initialState,
	reducers: {
		changePath: (state, action: PayloadAction<string>) => {
			state.path = action.payload;
		}
	}
});

export const { changePath } = routerSlice.actions;

export default routerSlice.reducer;
