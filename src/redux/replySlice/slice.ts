import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IChat } from '../../models/IChat';
import type { IMessage } from '../../models/IMessage';
import type { ReplySliceState } from './types';

const initialState: ReplySliceState = {};

export const replySlice = createSlice({
	name: 'reply',
	initialState,
	reducers: {
		showReply: (state, action: PayloadAction<IMessage>) => {
			state.parent = action.payload;
		},
		unShowReply: state => {
			state.parent = undefined;
		}
	}
});

export const { showReply, unShowReply } = replySlice.actions;

export default replySlice.reducer;
