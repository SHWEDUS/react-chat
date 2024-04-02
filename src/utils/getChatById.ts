import type { IChat } from '../models/IChat';

export const getChatById = (
	items: IChat[],
	id: number | string | undefined
): IChat | undefined => {
	return items.find(item => item.id === Number(id));
};
