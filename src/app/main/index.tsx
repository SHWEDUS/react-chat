import React, { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ChatArea from '../../components/chat-area';
import ChatContainer from '../../components/chat-container';
import PageLayout from '../../components/page-layout';
import ReplyMessage from '../../components/reply-message';
import { useAuthenticated } from '../../hooks/useAuthenticated';
import { type RootState, useAppDispatch } from '../../redux';
import { selectChats } from '../../redux/chatsSlice/selectors';
import { addChat, removeChat, sendMessage } from '../../redux/chatsSlice/slice';
import { selectReply } from '../../redux/replySlice/selectors';
import { showReply, unShowReply } from '../../redux/replySlice/slice';
import { selectRouter } from '../../redux/routerSlice/selectors';
import { changePath } from '../../redux/routerSlice/slice';
import { selectUser } from '../../redux/userSlice/selectors';
import { logout } from '../../redux/userSlice/slice';
import { getChatById } from '../../utils/getChatById';
import { getDateNow } from '../../utils/getDateNow';

function Main() {
	const { chatId } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const user = useSelector(selectUser);
	const chats = useSelector(selectChats);
	const chat = getChatById(chats, chatId);
	const reply = useSelector(selectReply);
	const location = useLocation();

	useEffect(() => {
		dispatch(changePath(location.pathname));
	}, [location]);
	useAuthenticated(user);

	const callbacks = {
		onSendMessage: useCallback(
			(text: string) => {
				const date = getDateNow();
				if (!reply) {
					return dispatch(
						sendMessage({
							text,
							chat: Number(chatId),
							author: user.name,
							id: (chat?.messages?.length || 0) + 1,
							parent: null,
							date: date
						})
					);
				}
				dispatch(
					sendMessage({
						text,
						chat: Number(chatId),
						author: user.name,
						id: (chat?.messages?.length || 0) + 1,
						parent: reply,
						date: date
					})
				);
				dispatch(unShowReply());
			},
			[chatId, reply, chat]
		),
		createChat: useCallback(
			(name: string) => dispatch(addChat(name)),
			[dispatch]
		),
		removeChat: useCallback(
			(id: number) => {
				dispatch(removeChat(id));
				location.pathname === `/chat/${id}` && navigate(`/chat/1`);
			},
			[dispatch]
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
			user={user}
			title={chat?.name}
			siderItems={chats}
			createChat={callbacks.createChat}
			logout={callbacks.onLogout}
			removeChat={callbacks.removeChat}
			footer={
				<>
					{reply && (
						<ReplyMessage item={reply} onCLose={callbacks.onCloseReply} />
					)}
					<ChatArea
						handleSendMessage={callbacks.onSendMessage}
						title={chat?.name}
					/>
				</>
			}
		>
			<ChatContainer
				messages={chat?.messages}
				chatId={chatId}
				userName={user.name}
			/>
		</PageLayout>
	);
}

export default memo(Main);
