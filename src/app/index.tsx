import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './login';
import Main from './main';

function App() {
	return (
		<Routes>
			<Route path={''} element={<Login />} />
			<Route path={'/chat/:chatId'} element={<Main />} />
		</Routes>
	);
}

export default App;
