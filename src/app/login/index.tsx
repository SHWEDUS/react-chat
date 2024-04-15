import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthForm from '../../components/auth-form';
import PageLayout from '../../components/page-layout';
import { type RootState, store, useAppDispatch } from '../../redux';
import { selectChats } from '../../redux/chatsSlice/selectors';
import { selectRouter } from '../../redux/routerSlice/selectors';
import { selectUser } from '../../redux/userSlice/selectors';
import { setUser } from '../../redux/userSlice/slice';

const Login = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useSelector(selectUser);
	const chats = useSelector(selectChats);
	const router = useSelector(selectRouter);

	useEffect(() => {
		if (user.isAuth) {
			router.includes('chat') ? navigate(router) : navigate('/chat/1');
		}
	}, []);

	const callbacks = {
		loginUser: useCallback((name: string) => dispatch(setUser(name)), [store])
	};

	return (
		<PageLayout user={user} title={'React Chat'}>
			<AuthForm login={callbacks.loginUser} chatList={chats} />
		</PageLayout>
	);
};

export default memo(Login);
