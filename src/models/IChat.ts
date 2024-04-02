import type { IMessage } from './IMessage';

export interface IChat {
	id: number;
	name: string;
	messages: IMessage[];
}
