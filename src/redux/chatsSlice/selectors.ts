import type { RootState } from '../index';

export const selectChats = (state: RootState) => state.chats.items;
