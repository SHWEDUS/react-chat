import React, { memo, useState } from 'react';
import { Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { isEmptyOrSpaces } from '../../utils/is-empty-or-spaces';
import styles from './styles.module.scss';
const { TextArea } = Input;

interface ChatAreaProps {
	handleSendMessage: (text: string) => void;
}
const ChatArea: React.FC<ChatAreaProps> = ({ handleSendMessage }) => {
	const [value, setValue] = useState('');

	const handleOnClick = () => {
		!isEmptyOrSpaces(value) && handleSendMessage(value);
		setValue('');
	};

	return (
		<div className={styles.chatArea}>
			<TextArea value={value} onChange={e => setValue(e.target.value)} />
			<Button onClick={handleOnClick}>
				<SendOutlined />
			</Button>
		</div>
	);
};

export default memo(ChatArea);
