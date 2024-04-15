import { Button, Layout, List, Typography } from 'antd';
import React, { memo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { IChat } from '../../models/IChat';
import type { IUser } from '../../models/IUser';
import styles from './styles.module.scss';
import { LogoutOutlined } from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
interface PageLayoutProps {
	children: React.ReactNode;
	user: IUser;
	title: React.ReactNode;
	siderItems?: IChat[];
	footer?: React.ReactNode;
	logout?: () => void;
}

const layoutStyle: React.CSSProperties = {
	borderRadius: 8,
	overflow: 'hidden',
	width: 'calc(50% - 8px)',
	maxWidth: 'calc(50% - 8px)',
	margin: '0 auto',
	boxShadow: '10px 5px 5px gray',
	height: '98vh',
	border: '1px solid gray'
};

const headerStyle: React.CSSProperties = {
	borderTopLeftRadius: 8,
	borderTopRightRadius: 8,
	textAlign: 'center',
	color: '#fff',
	fontSize: '18px',
	paddingInline: 48,
	backgroundColor: '#4096ff'
};

const headerSliderStyle: React.CSSProperties = {
	...headerStyle,
	display: 'flex',
	lineHeight: '12px',
	paddingInline: 20,
	fontSize: '12px',
	justifyContent: 'space-between',
	alignItems: 'center'
};

const contentStyle: React.CSSProperties = {
	minHeight: 120,
	color: '#0958d9',
	backgroundColor: '#fff',
	padding: '20px',
	overflow: 'auto'
};

const siderStyle: React.CSSProperties = {
	borderRadius: 8,
	textAlign: 'center',
	boxShadow: '10px 5px 5px gray'
};

const footerStyle: React.CSSProperties = {
	textAlign: 'center',
	color: '#fff',
	backgroundColor: '#4096ff',
	padding: '20px'
};

const PageLayout: React.FC<PageLayoutProps> = ({
	children,
	user,
	title,
	siderItems,
	footer,
	logout
}) => {
	const messagesContainerRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop =
				messagesContainerRef.current.scrollHeight;
		}
	}, [children]);

	if (user.isAuth) {
		return (
			<Layout>
				<Sider width='20%' style={siderStyle} theme={'light'}>
					<Header style={headerSliderStyle}>
						<span>{user.name}</span>
						<Button onClick={logout}>
							<LogoutOutlined />
						</Button>
					</Header>
					<List
						className={styles.list}
						dataSource={siderItems}
						renderItem={item => (
							<List.Item key={item.id} className={styles.item}>
								<Link to={`/chat/${item.id}`}>{item.name}</Link>
							</List.Item>
						)}
					/>
				</Sider>
				<Layout style={layoutStyle}>
					<Header style={headerStyle}>{title}</Header>
					<Content ref={messagesContainerRef} style={contentStyle}>
						{children}
					</Content>
					<Footer style={footerStyle}>{footer}</Footer>
				</Layout>
			</Layout>
		);
	}

	return (
		<Layout style={layoutStyle}>
			<Header style={headerStyle}>React Chat</Header>
			<Content style={contentStyle}>{children}</Content>
		</Layout>
	);
};

export default memo(PageLayout);