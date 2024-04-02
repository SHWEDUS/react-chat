import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/auth-form';
import PageLayout from '../../components/page-layout';
import { type RootState, store, useAppDispatch } from '../../redux';
import { setUser } from '../../redux/userSlice/slice';

const Login = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const select = useSelector((state: RootState) => ({
		user: state.user,
		chats: state.chats.items
	}));

	useEffect(() => {
		if (select.user.isAuth) {
			navigate(-1);
		}
	}, [select.user]);

	const callbacks = {
		loginUser: useCallback((name: string) => dispatch(setUser(name)), [store])
	};

	return (
		<PageLayout user={select.user} title={'React Chat'}>
			<AuthForm login={callbacks.loginUser} chatList={select.chats} />
		</PageLayout>
	);
};

export default memo(Login);
