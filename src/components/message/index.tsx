import { Card } from 'antd';
import React, { memo } from 'react';
import type { IMessage } from '../../models/IMessage';
import styles from './styles.module.scss';

interface MessageProps {
	item: IMessage;
}

const Message: React.FC<MessageProps> = ({ item }) => {
	return (
		<Card className={styles.messageCard}>
			<span className={styles.messageHeader}>
				<b>{item.author}</b>
				<span>{item.date}</span>
			</span>
			<p className={styles.messageText}>{item.text}</p>
		</Card>
	);
};

export default memo(Message);
