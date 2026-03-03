import { Table, Button, Input, Popconfirm, Drawer } from 'antd';
import type { sanPham } from './Data';
import FormSanPham from './FormSanPham';
import { useState } from 'react';

const danhSachSanPham: sanPham[] = [
	{ id: 1, name: 'Laptop Dell XPS 13', price: 25000000, quantity: 10 },

	{ id: 2, name: 'iPhone 15 Pro Max', price: 30000000, quantity: 15 },

	{ id: 3, name: 'Samsung Galaxy S24', price: 22000000, quantity: 20 },

	{ id: 4, name: 'iPad Air M2', price: 18000000, quantity: 12 },

	{ id: 5, name: 'MacBook Air M3', price: 28000000, quantity: 8 },
];

const Bang = () => {
	const [dsSanPham, setDSSanPham] = useState<sanPham[]>(danhSachSanPham);
	const [input, setInput] = useState<string>('');
	const [open, setOpen] = useState(false);

	const sanPhamCanTim = dsSanPham.filter((i) => i.name.toLowerCase().includes(input.toLowerCase()));
	const xoaSanPham = (id: number) => {
		setDSSanPham(dsSanPham.filter((i) => i.id != id));
	};
	const showForm = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};

	const column = [
		{
			title: 'STT',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Tên sản phẩm',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Giá tiền',
			dataIndex: 'price',
			key: 'price',
		},
		{
			title: 'Số lượng',
			dataIndex: 'quantity',
			key: 'quantity',
		},
		{
			title: 'Thao tác',
			key: 'acttion',
			render: (_: any, record: any) => (
				<>
					<Popconfirm
						title='Bạn có muốn xóa sản phẩm này?'
						onConfirm={() => xoaSanPham(record.id)}
						okText='Xóa'
						cancelText='Hủy'
					>
						{' '}
						<Button>Xóa</Button>
					</Popconfirm>
				</>
			),
		},
	];
	return (
		<>
			<h1>Danh sách sản phẩm</h1>
			<Input.Search
				placeholder='Tìm kiếm sản phẩm'
				style={{ width: 500 }}
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>{' '}
			<br />
			<Button type='primary' onClick={() => showForm()}>
				Thêm sản phẩm
			</Button>
			<Drawer title='Thêm sản phẩm' closable={true} onClose={onClose} visible={open} size='large'>
				<FormSanPham danhSachSanPham={dsSanPham} setDanhSachSanPham={setDSSanPham} />
			</Drawer>
			<Table dataSource={sanPhamCanTim} columns={column} size='middle' bordered />
		</>
	);
};

export default Bang;
