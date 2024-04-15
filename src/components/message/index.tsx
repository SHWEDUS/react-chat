import { Button, Card } from 'antd';
import React, { memo, useRef } from 'react';
import type { IMessage } from '../../models/IMessage';
import ReplyMessage from '../reply-message';
import styles from './styles.module.scss';

interface MessageProps {
	item: IMessage;
	onReply: (message: IMessage) => void;
}

const Message: React.FC<MessageProps> = ({ item, onReply }) => {
	return (
		<Card className={styles.messageCard}>
			{item.parent && <ReplyMessage item={item.parent} isInList={true} />}
			<span className={styles.messageHeader}>
				<b>{item.author}</b>
				<span>{item.date.slice(11, 17)}</span>
			</span>
			<p className={styles.messageText}>{item.text}</p>
			<Button
				className={styles.replyBtn}
				type={'link'}
				onClick={() => onReply(item)}
			>
				Ответить
			</Button>
		</Card>
	);
};

export default memo(Message);
