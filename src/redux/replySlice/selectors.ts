import type { RootState } from '../index';

export const selectReply = (state: RootState) => state.reply.parent;
