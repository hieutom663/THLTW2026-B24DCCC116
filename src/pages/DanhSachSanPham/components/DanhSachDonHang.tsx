import { useState } from 'react';
import type { donHang } from './Data';
import { Table, Select, Modal, Button, Drawer } from 'antd';
import FormDonHang from './FormDonHang';

const danhSachDonHang: donHang[] = [
	{
		id: 'DH001',
		customerName: 'Nguyễn Văn A',
		phone: '0912345678',
		address: '123 Nguyễn Huệ, Q1, TP.HCM',
		products: [
			{ productId: 1, productName: 'Laptop Dell XPS 13', quantity: 1, price: 25000000 },
			{ productId: 2, productName: 'iPhone 15 Pro Max', quantity: 1, price: 30000000 },
		],
		totalAmount: 55000000,
		status: 'Chờ xử lý',
		createdAt: '2024-01-15',
	},
	{
		id: 'DH002',
		customerName: 'Nguyễn Văn B',
		phone: '0911345678',
		address: '124 Nguyễn Huệ, Q1, TP.HCM',
		products: [{ productId: 2, productName: 'iPhone 15 Pro Max', quantity: 1, price: 30000000 }],
		totalAmount: 30000000,
		status: 'Chờ xử lý',
		createdAt: '2024-01-16',
	},
];

const DanhSachDonHang = () => {
	const [dsDonHang, setDSDonHang] = useState<donHang[]>(danhSachDonHang);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selected, setSelected] = useState<donHang | null>(null);
	const showModal = (o: donHang) => {
		setSelected(o);
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setSelected(null);
		setIsModalOpen(false);
	};

	const [open, setOpen] = useState(false);
	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};

	const column = [
		{ title: 'Mã đơn hàng', dataIndex: 'id', key: 'id' },
		{ title: 'Tên khách hàng', dataIndex: 'customerName', id: 'customerName' },
		{
			title: 'Số sản phẩm',
			id: 'quantity',
			render: (_: any, record: any) => <>{record.products.length}</>,
		},
		{ title: 'Tổng tiền', dataIndex: 'totalAmount', id: 'totalAmount' },
		{
			title: 'Trạng thái',
			id: 'status',
			render: (_: any, record: any) => (
				<Select
					defaultValue={record.status}
					style={{ width: 120 }}
					options={[
						{ value: 'Chờ xử lý', label: 'Chờ xử lý' },
						{ value: 'Đang giao', label: 'Đang giao' },
						{ value: 'Hoàn thành', label: 'Hoàn thành' },
						{ value: 'Đã hủy', label: 'Đã hủy' },
					]}
				/>
			),
		},
		{ title: 'Ngày tạo', dataIndex: 'createdAt', id: 'createdAt' },
		{
			title: 'Thao tác',
			id: 'action',
			render: (_: any, record: any) => (
				<>
					<Button type='primary' onClick={() => showModal(record)}>
						Xem chi tiết
					</Button>
					<Modal
						title='Thông tin đơn hàng'
						closable
						aria-label='Custom Close Button'
						visible={isModalOpen}
						onOk={handleOk}
						onCancel={handleOk}
					>
						{selected && (
							<>
								{selected.products.map((p) => (
									<div key={p.productId}>
										<p>Tên sản phẩm: {p.productName}</p>
										<p>Số lượng: {p.quantity}</p>
										<p>Giá: {p.price} VND</p>
										<hr />
									</div>
								))}
								<p>Tên khách hàng: {selected.customerName}</p>
								<p>Số điện thoại: {selected.phone}</p>
								<p>Địa chỉ: {selected.address}</p>
							</>
						)}
					</Modal>
				</>
			),
		},
	];

	return (
		<>
			<Button type='primary' onClick={showDrawer}>
				{' '}
				Thêm đơn hàng
			</Button>
			<Drawer title='Basic Drawer' placement='right' onClose={onClose} visible={open} size='large'>
				<FormDonHang />
			</Drawer>
			<Table columns={column} dataSource={dsDonHang} bordered size='middle' />;
		</>
	);
};

export default DanhSachDonHang;
