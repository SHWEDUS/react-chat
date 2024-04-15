import EmojiPicker from 'emoji-picker-react';
import React, { memo, useRef, useState } from 'react';
import { Button, Input } from 'antd';
import { SendOutlined, SmileOutlined } from '@ant-design/icons';
import { isEmptyOrSpaces } from '../../utils/is-empty-or-spaces';
import styles from './styles.module.scss';
const { TextArea } = Input;

interface ChatAreaProps {
	handleSendMessage: (text: string) => void;
	title?: string;
}
const ChatArea: React.FC<ChatAreaProps> = ({ handleSendMessage, title }) => {
	const [value, setValue] = useState('');
	const [isEmojiOpen, setIsEmojiOpen] = useState(false);
	const inputRef = useRef<HTMLTextAreaElement>(null);

	const handleOnClick = () => {
		if (isEmptyOrSpaces(value)) {
			return;
		}
		handleSendMessage(value);
		setValue('');
		setIsEmojiOpen(false);
	};

	const handleOnClickEmoji = (emoji: string) => {
		setValue(prevState => prevState + emoji);
		inputRef?.current?.focus();
	};

	if (!title) {
		return <></>;
	}

	return (
		<div className={styles.chatArea}>
			<EmojiPicker
				className={styles.emojiPicker}
				style={{ opacity: isEmojiOpen ? 1 : 0 }}
				open={isEmojiOpen}
				onEmojiClick={emoji => handleOnClickEmoji(emoji.emoji)}
			/>
			<TextArea
				ref={inputRef}
				value={value}
				onChange={e => {
					setValue(e.target.value);
				}}
				autoSize={{ minRows: 2, maxRows: 5 }}
			/>
			<Button
				type='default'
				onClick={() => {
					inputRef?.current?.focus();
					setIsEmojiOpen(!isEmojiOpen);
				}}
			>
				<SmileOutlined />
			</Button>
			<Button onClick={handleOnClick}>
				<SendOutlined />
			</Button>
		</div>
	);
};

export default memo(ChatArea);
