import type { ChatSliceState } from '../redux/chatsSlice/types';

export const getChats = (): ChatSliceState => {
	try {
		const items = JSON.parse(localStorage.getItem('chats') as string) || [
			{
				id: 1,
				name: 'Game chat',
				messages: []
			},
			{
				id: 2,
				name: 'Work chat',
				messages: []
			},
			{
				id: 3,
				name: 'Family chat',
				messages: []
			}
		];
		return { items };
	} catch (e) {
		return {
			items: [
				{
					id: 1,
					name: 'Game chat',
					messages: []
				},
				{
					id: 2,
					name: 'Work chat',
					messages: []
				},
				{
					id: 3,
					name: 'Family chat',
					messages: []
				}
			]
		};
	}
};
