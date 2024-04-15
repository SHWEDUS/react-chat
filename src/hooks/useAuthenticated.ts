import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { IUser } from '../models/IUser';

export const useAuthenticated = (user: IUser, link = '/') => {
	const navigate = useNavigate();
	useEffect(() => {
		if (!user.isAuth) {
			navigate(link);
		}
	}, [user]);
};
