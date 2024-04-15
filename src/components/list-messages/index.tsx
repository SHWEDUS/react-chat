import { Button, Flex } from 'antd';
import React, { memo, useEffect, useRef } from 'react';
import type { IMessage } from '../../models/IMessage';
import { getDateNow } from '../../utils/getDateNow';

interface ListMessagesProps {
	list?: IMessage[];
	renderMessage: (message: IMessage) => React.ReactNode;
	userName: string;
}

const ListMessages: React.FC<ListMessagesProps> = ({
	list,
	renderMessage,
	userName
}) => {
	const messagesContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Прокрутка контейнера сообщений вниз при изменении списка сообщений
		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop =
				messagesContainerRef.current.scrollHeight;
		}
	}, [list]); // Вызывается при изменении списка сообщений
	if (!list || list.length === 0) {
		return null; // Пустой список, ничего не отображаем
	}

	const sortedMessages = [...list].sort((a, b) => {
		const dateA = new Date(a.date);
		const dateB = new Date(b.date);
		return dateA.getTime() - dateB.getTime(); // Сортировка по убыванию времени
	});

	// Мапа для хранения группированных сообщений по дням
	const messagesByDay = new Map<string, IMessage[]>();

	// Группируем сообщения по дням
	sortedMessages.forEach(item => {
		const dateKey = item.date.slice(0, 10); // Берем только дату без времени
		if (!messagesByDay.has(dateKey)) {
			messagesByDay.set(dateKey, []);
		}
		messagesByDay.get(dateKey)?.push(item);
	});

	return (
		<Flex vertical={true} gap={10}>
			{[...messagesByDay.keys()].map((dateKey, index) => (
				<React.Fragment key={dateKey}>
					{dateKey === getDateNow().slice(0, 10) ? (
						<Button>{'Сегодня'}</Button>
					) : (
						<Button>{dateKey}</Button>
					)}
					{messagesByDay.get(dateKey)?.map(item => (
						<div
							ref={messagesContainerRef}
							style={{
								display: 'flex',
								justifyContent: `${
									item.author === userName ? 'flex-end' : 'flex-start'
								}`
							}}
							key={item.id}
						>
							{renderMessage(item)}
						</div>
					))}
				</React.Fragment>
			))}
		</Flex>
	);
};

export default memo(ListMessages);
