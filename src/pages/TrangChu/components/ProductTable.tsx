import { useState } from 'react';
import { Table, Button, Input, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface Product {
	id: number;
	name: string;
	price: number;
	quantity: number;
}

const initialData: Product[] = [
	{ id: 1, name: 'Laptop Dell XPS 13', price: 25000000, quantity: 10 },
	{ id: 2, name: 'iPhone 15 Pro Max', price: 30000000, quantity: 15 },
	{ id: 3, name: 'Samsung Galaxy S24', price: 22000000, quantity: 20 },
	{ id: 4, name: 'iPad Air M2', price: 18000000, quantity: 12 },
	{ id: 5, name: 'MacBook Air M3', price: 28000000, quantity: 8 },
];

const ProductTable = () => {
	const [dataSource, setDataSource] = useState<Product[]>(initialData);
	const [searchText, setSearchText] = useState<string>('');

	const handleDeleteProduct = (id: number) => {
		setDataSource((prev) => prev.filter((item) => item.id !== id));
	};

	const columns = [
		{ title: 'STT', dataIndex: 'id', key: 'id' },
		{ title: 'Tên', dataIndex: 'name', key: 'name' },
		{ title: 'Giá', dataIndex: 'price', key: 'price' },
		{ title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
		{
			title: 'Thao tác',
			key: 'action',
			render: (_: any, record: any) => (
				<>
					<Popconfirm
						title='Bạn có chắc muốn xóa sản phẩm này?'
						onConfirm={() => handleDeleteProduct(record.id)}
						okText='Xóa'
						cancelText='Hủy'
					>
						<Button danger icon={<DeleteOutlined />}>
							Xóa
						</Button>
					</Popconfirm>
				</>
			),
		},
	];
	const filteredData = dataSource.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));
	return (
		<div>
			<Input.Search
				placeholder='Tìm kiếm sản phẩm...'
				allowClear
				style={{ marginBottom: 16, width: 300 }}
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
			/>
			<Table dataSource={filteredData} columns={columns} rowKey='id' />
		</div>
	);
};

export default ProductTable;
