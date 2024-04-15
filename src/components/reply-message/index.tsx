import { Button } from 'antd';
import React, { memo } from 'react';
import type { IMessage } from '../../models/IMessage';
import styles from './styles.module.scss';
import { CloseOutlined } from '@ant-design/icons';

interface MessageProps {
	item: IMessage;
	onCLose?: () => void;
	isInList?: boolean;
}

const ReplyMessage: React.FC<MessageProps> = ({
	item,
	onCLose,
	isInList = false
}) => {
	if (!isInList) {
		return (
			<div id={item.id.toString()} className={styles.messageCard}>
				<span className={styles.messageHeader}>
					<b>{item.author}</b>
					<p className={styles.messageText}>{item.text}</p>
				</span>
				<button className={styles.cross} onClick={onCLose}>
					<CloseOutlined />
				</button>
			</div>
		);
	}
	return (
		<a
			href={`#${item.id}`}
			id={item.id.toString()}
			className={styles.messageCardChat}
		>
			<span className={styles.messageHeader}>
				<b>{item.author}</b>
				<p className={styles.messageText}>{item.text}</p>
			</span>
		</a>
	);
};

export default memo(ReplyMessage);
