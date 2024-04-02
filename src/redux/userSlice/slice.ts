import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUser } from '../../utils/getUser';
import { UserSliceState } from './types';

const initialState: UserSliceState = getUser();

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
			state.isAuth = true;
			sessionStorage.setItem(
				'user',
				JSON.stringify({ isAuth: true, name: action.payload })
			);
		},
		logout: state => {
			state.name = '';
			state.isAuth = false;
			sessionStorage.removeItem('user');
		}
	}
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
