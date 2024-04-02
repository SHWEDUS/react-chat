export interface IMessage {
	id: number;
	chat: number;
	text: string;
	parent?: IMessage | null;
	author: string;
	date: string;
}
