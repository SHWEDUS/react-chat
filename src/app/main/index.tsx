import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ChatArea from '../../components/chat-area';
import ChatContainer from '../../components/chat-container';
import PageLayout from '../../components/page-layout';
import { type RootState, useAppDispatch } from '../../redux';
import { sendMessage } from '../../redux/chatsSlice/slice';
import { logout } from '../../redux/userSlice/slice';
import { getChatById } from '../../utils/getChatById';

function Main() {
	const { chatId } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const select = useSelector((state: RootState) => ({
		user: state.user,
		chats: state.chats.items,
		chat: getChatById(state.chats.items, chatId)
	}));
	const callbacks = {
		onSendMessage: useCallback(
			(text: string) => {
				const date = new Date(Date.now());
				dispatch(
					sendMessage({
						text,
						chat: Number(chatId),
						author: select.user.name,
						id: (select.chat?.messages?.length || 0) + 1,
						parent: null,
						date: `${date.getHours()}:${date.getMinutes()}`
					})
				);
			},
			[chatId, select]
		),
		onLogout: useCallback(() => {
			dispatch(logout());
			navigate('/');
		}, [navigate])
	};

	return (
		<PageLayout
			user={select.user}
			title={select.chat?.name}
			siderItems={select.chats}
			logout={callbacks.onLogout}
			footer={<ChatArea handleSendMessage={callbacks.onSendMessage} />}
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
