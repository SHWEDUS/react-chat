import { Flex, Space } from 'antd';
import { memo, useCallback } from 'react';
import type { IMessage } from '../../models/IMessage';
import { useAppDispatch } from '../../redux';
import { sendMessage } from '../../redux/chatsSlice/slice';
import { showReply } from '../../redux/replySlice/slice';
import ChatArea from '../chat-area';
import ListMessages from '../list-messages';
import Message from '../message';

interface ChatContainerProps {
	messages?: IMessage[];
	chatId?: string;
	userName: string;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
	messages,
	chatId,
	userName
}) => {
	const dispatch = useAppDispatch();
	const callbacks = {
		onReply: useCallback(
			(message: IMessage) => dispatch(showReply(message)),
			[dispatch]
		)
	};
	const renders = {
		message: useCallback(
			(message: IMessage) => (
				<Message item={message} onReply={callbacks.onReply} />
			),
			[]
		)
	};
	return (
		<Flex vertical={true}>
			<ListMessages
				list={messages}
				renderMessage={renders.message}
				userName={userName}
			/>
		</Flex>
	);
};

export default memo(ChatContainer);
