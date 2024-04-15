import React, { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ChatArea from '../../components/chat-area';
import ChatContainer from '../../components/chat-container';
import PageLayout from '../../components/page-layout';
import ReplyMessage from '../../components/reply-message';
import { type RootState, useAppDispatch } from '../../redux';
import { sendMessage } from '../../redux/chatsSlice/slice';
import { showReply, unShowReply } from '../../redux/replySlice/slice';
import { logout } from '../../redux/userSlice/slice';
import { getChatById } from '../../utils/getChatById';
import { getDateNow } from '../../utils/getDateNow';

function Main() {
	const { chatId } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const select = useSelector((state: RootState) => ({
		user: state.user,
		chats: state.chats.items,
		chat: getChatById(state.chats.items, chatId),
		reply: state.reply.parent
	}));
	const callbacks = {
		onSendMessage: useCallback(
			(text: string) => {
				const date = getDateNow();
				if (!select.reply) {
					return dispatch(
						sendMessage({
							text,
							chat: Number(chatId),
							author: select.user.name,
							id: (select.chat?.messages?.length || 0) + 1,
							parent: null,
							date: date
						})
					);
				}
				dispatch(
					sendMessage({
						text,
						chat: Number(chatId),
						author: select.user.name,
						id: (select.chat?.messages?.length || 0) + 1,
						parent: select.reply,
						date: date
					})
				);
				dispatch(unShowReply());
			},
			[chatId, select]
		),
		onLogout: useCallback(() => {
			dispatch(logout());
			navigate('/');
		}, [navigate]),
		onCloseReply: useCallback(() => {
			dispatch(unShowReply());
		}, [dispatch])
	};

	return (
		<PageLayout
			user={select.user}
			title={select.chat?.name}
			siderItems={select.chats}
			logout={callbacks.onLogout}
			footer={
				<>
					{select.reply && (
						<ReplyMessage
							item={select.reply}
							onCLose={callbacks.onCloseReply}
						/>
					)}
					<ChatArea handleSendMessage={callbacks.onSendMessage} />
				</>
			}
		>
			<ChatContainer
				messages={select.chat?.messages}
				chatId={chatId}
				userName={select.user.name}
			/>
		</PageLayout>
	);
}

export default memo(Main);
