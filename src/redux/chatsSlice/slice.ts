import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IChat } from '../../models/IChat';
import type { IMessage } from '../../models/IMessage';
import { getChats } from '../../utils/getChats';
import type { ChatSliceState } from './types';

const initialState: ChatSliceState = getChats();

export const userSlice = createSlice({
	name: 'chats',
	initialState,
	reducers: {
		addChat: (state, action: PayloadAction<string>) => {
			const chat: IChat = {
				name: action.payload,
				messages: [],
				id:
					state.items.reduce(
						(prev, current) => (prev <= current.id ? current.id : prev),
						0
					) + 1
			};
			state.items = [...state.items, chat];
			localStorage.setItem('chats', JSON.stringify(state.items));
		},
		removeChat: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter(item => item.id !== action.payload);
			localStorage.setItem('chats', JSON.stringify(state.items));
		},
		sendMessage: (state, action: PayloadAction<IMessage>) => {
			const chat = state.items.find(item => item.id === action.payload.chat);
			if (!chat) {
				return;
			}
			const newChat = { ...chat, messages: [...chat.messages, action.payload] };

			state.items = [
				...state.items.filter(item => item.id !== newChat.id),
				newChat
			];
			localStorage.setItem('chats', JSON.stringify(state.items));
		}
	}
});

export const { addChat, sendMessage, removeChat } = userSlice.actions;

export default userSlice.reducer;
