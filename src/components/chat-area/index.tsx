import EmojiPicker from 'emoji-picker-react';
import React, { memo, useState } from 'react';
import { Button, Input } from 'antd';
import { SendOutlined, SmileOutlined } from '@ant-design/icons';
import { isEmptyOrSpaces } from '../../utils/is-empty-or-spaces';
import styles from './styles.module.scss';
const { TextArea } = Input;

interface ChatAreaProps {
	handleSendMessage: (text: string) => void;
}
const ChatArea: React.FC<ChatAreaProps> = ({ handleSendMessage }) => {
	const [value, setValue] = useState('');
	const [isEmojiOpen, setIsEmojiOpen] = useState(false);

	const handleOnClick = () => {
		if (isEmptyOrSpaces(value)) {
			return;
		}
		handleSendMessage(value);
		setValue('');
		setIsEmojiOpen(false);
	};

	return (
		<div className={styles.chatArea}>
			<TextArea
				value={value}
				onChange={e => setValue(e.target.value)}
				autoSize={{ minRows: 2, maxRows: 5 }}
			/>
			<Button onClick={handleOnClick}>
				<SendOutlined />
			</Button>
		</div>
	);
};

export default memo(ChatArea);
