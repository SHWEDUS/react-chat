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
	return (
		<div className={!isInList ? styles.messageCard : styles.messageCardChat}>
			<span className={styles.messageHeader}>
				<b>{item.author}</b>
				<p className={styles.messageText}>{item.text}</p>
			</span>
			{!isInList && (
				<button className={styles.cross} onClick={onCLose}>
					<CloseOutlined />
				</button>
			)}
		</div>
	);
};

export default memo(ReplyMessage);
