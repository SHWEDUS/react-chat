import type { RootState } from '../index';

export const selectRouter = (state: RootState) => state.router.path;
