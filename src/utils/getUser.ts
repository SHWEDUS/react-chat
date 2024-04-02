import type { UserSliceState } from '../redux/userSlice/types';

export const getUser = (): UserSliceState => {
	try {
		return (
			JSON.parse(sessionStorage.getItem('user') as string) || {
				name: 'Аноним',
				isAuth: false
			}
		);
	} catch (e) {
		return { name: 'Аноним', isAuth: false };
	}
};
