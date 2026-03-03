import { Table, Button, Input, Popconfirm, Drawer, Tag } from 'antd';
import type { sanPham } from './Data';
import FormSanPham from './FormSanPham';
import { useState } from 'react';

const danhSachSanPham: sanPham[] = [
	{ id: 1, name: 'Laptop Dell XPS 13', category: 'Laptop', price: 25000000, quantity: 15 },
	{ id: 2, name: 'iPhone 15 Pro Max', category: 'Điện thoại', price: 30000000, quantity: 8 },
	{ id: 3, name: 'Samsung Galaxy S24', category: 'Điện thoại', price: 22000000, quantity: 20 },
	{ id: 4, name: 'iPad Air M2', category: 'Máy tính bảng', price: 18000000, quantity: 5 },
	{ id: 5, name: 'MacBook Air M3', category: 'Laptop', price: 28000000, quantity: 12 },
	{ id: 6, name: 'AirPods Pro 2', category: 'Phụ kiện', price: 6000000, quantity: 0 },
	{ id: 7, name: 'Samsung Galaxy Tab S9', category: 'Máy tính bảng', price: 15000000, quantity: 7 },
	{ id: 8, name: 'Logitech MX Master 3', category: 'Phụ kiện', price: 2500000, quantity: 25 },
];

const Bang = () => {
	const [dsSanPham, setDSSanPham] = useState<sanPham[]>(danhSachSanPham);
	const [trang, setTrang] = useState(1);
	const slspTrongTrang = 5;
	const stIndex = (trang - 1) * slspTrongTrang;
	const eIndex = stIndex + slspTrongTrang;
	const dsSPTrongTrang = dsSanPham.slice(stIndex, eIndex);

	const [input, setInput] = useState<string>('');

	const [open, setOpen] = useState(false);

	const sanPhamCanTim = dsSanPham.filter((i) => i.name.toLowerCase().includes(input.toLowerCase()));
	const xoaSanPham = (id: number) => {
		setDSSanPham(dsSPTrongTrang.filter((i) => i.id != id));
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
			title: 'Danh mục',
			dataIndex: 'category',
			key: 'category',
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
			title: 'Trạng thái',
			key: 'status',
			render: (_: any, record: any) => {
				const q = record.quantity;
				const color = q > 10 ? 'green' : q > 0 ? 'yellow' : 'red';
				return (
					<Tag color={color} key={record.quantity}>
						{q > 10 ? 'Còn hàng' : q > 0 ? 'Sắp hết' : 'Hết hàng'}
					</Tag>
				);
			},
		},
		{
			title: 'Thao tác',
			key: 'action',
			render: (_: any, record: any) => (
				<>
					<Popconfirm
						title='Bạn có muốn xóa sản phẩm này?'
						onConfirm={() => xoaSanPham(record.id)}
						okText='Xóa'
						cancelText='Hủy'
					>
						{' '}
						<Button type='primary'>Xóa</Button>
					</Popconfirm>
					<Popconfirm
						title='Bạn có muốn chỉnh sửa sản phẩm này?'
						onConfirm={() => xoaSanPham(record.id)}
						okText='Sửa'
						cancelText='Hủy'
					>
						{' '}
						<Button>Chỉnh sửa</Button>
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
			<Table
				dataSource={sanPhamCanTim}
				columns={column}
				size='middle'
				bordered
				pagination={{ current: trang, pageSize: slspTrongTrang, total: dsSanPham.length, onChange: (p) => setTrang(p) }}
			/>
		</>
	);
};

export default Bang;
