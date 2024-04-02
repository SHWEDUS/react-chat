import { memo } from 'react';
import { Input, Select, Button, Form } from 'antd';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import type { IChat } from '../../models/IChat';

const { Option } = Select;

interface AuthFormArgs {
	name: string;
	chat: number;
}

interface AuthFormProps {
	login: (name: string) => void;
	chatList: IChat[];
}

const AuthForm: React.FC<AuthFormProps> = ({ login, chatList }) => {
	const [form] = Form.useForm<AuthFormArgs>();
	const navigate = useNavigate();

	const handleFormSubmit = (values: AuthFormArgs) => {
		login(values.name);
		navigate(`/chat/${values.chat}`);
	};

	return (
		<Form form={form} onFinish={handleFormSubmit}>
			<Title style={{ fontSize: '25px' }}>Авторизуйтесь</Title>
			<Form.Item
				label='Имя'
				name='name'
				rules={[{ required: true, message: 'Введите имя' }]}
			>
				<Input autoComplete={'off'} />
			</Form.Item>

			<Form.Item
				label='Чат'
				name='chat'
				rules={[{ required: true, message: 'Выберите чат' }]}
			>
				<Select
					options={chatList.map(chat => ({
						label: chat.name,
						value: chat.id
					}))}
				></Select>
			</Form.Item>

			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Отправить
				</Button>
			</Form.Item>
		</Form>
	);
};

export default memo(AuthForm);
