import { Flex } from 'antd';
import React, { memo } from 'react';
import type { IMessage } from '../../models/IMessage';

interface ListMessagesProps {
	list?: IMessage[];
	renderMessage: (message: IMessage) => React.ReactNode;
	userName: string;
}

const ListMessages: React.FC<ListMessagesProps> = ({
	list,
	renderMessage,
	userName
}) => {
	return (
		<Flex vertical={true} gap={10}>
			{list?.map(item => (
				<div
					style={{
						display: 'flex',
						justifyContent: `${item.author === userName ? 'flex-end' : 'flex-start'}`
					}}
					key={item.id}
				>
					{renderMessage(item)}
				</div>
			))}
		</Flex>
	);
};

export default memo(ListMessages);
