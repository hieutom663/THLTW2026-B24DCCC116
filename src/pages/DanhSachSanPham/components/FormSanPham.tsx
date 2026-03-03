import { Form, Input, InputNumber, Button } from 'antd';
import { useState } from 'react';
import type { sanPham } from './Data';

const FormSanPham = (props: { danhSachSanPham: sanPham[]; setDanhSachSanPham: any }) => {
	const { danhSachSanPham, setDanhSachSanPham } = props;
	const [form] = Form.useForm();
	const [thongTinNguoiDungNhap, setThongTinNguoiDungNhap] = useState<sanPham>({
		id: 0,
		name: '',
		category: '',
		price: 0,
		quantity: 0,
	});
	const onFinish = (values: any) => {
		console.log('Form values:', values);
	};

	const submit = () => {
		setDanhSachSanPham([...danhSachSanPham, { ...thongTinNguoiDungNhap, id: danhSachSanPham.length + 1 }]);
	};

	return (
		<Form form={form} layout='vertical' onFinish={onFinish}>
			<Form.Item label='Tên sản phẩm' name='name' rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}>
				<Input
					placeholder='Nhập tên sản phẩm'
					onChange={(e) => {
						setThongTinNguoiDungNhap({ ...thongTinNguoiDungNhap, name: e.target.value });
					}}
				/>
			</Form.Item>

			<Form.Item
				label='Loại sản phẩm'
				name='category'
				rules={[{ required: true, message: 'Vui lòng nhập loại sản phẩm!' }]}
			>
				<Input
					placeholder='Nhập loại sản phẩm'
					onChange={(e) => {
						setThongTinNguoiDungNhap({ ...thongTinNguoiDungNhap, category: e.target.value });
					}}
				/>
			</Form.Item>

			<Form.Item
				label='Giá'
				name='price'
				rules={[
					{ required: true, message: 'Vui lòng nhập giá!' },
					{
						type: 'number',
						min: 1,
						message: 'Giá phải là số dương!',
					},
				]}
			>
				<InputNumber
					style={{ width: '100%' }}
					placeholder='Nhập giá sản phẩm'
					onChange={(value: any) => {
						setThongTinNguoiDungNhap({ ...thongTinNguoiDungNhap, price: value });
					}}
				/>
			</Form.Item>

			<Form.Item
				label='Số lượng'
				name='quantity'
				rules={[
					{ required: true, message: 'Vui lòng nhập số lượng!' },
					{
						type: 'number',
						min: 1,
						message: 'Số lượng phải là số nguyên dương!',
					},
					{
						validator: (_, value) =>
							Number.isInteger(value) ? Promise.resolve() : Promise.reject('Số lượng phải là số nguyên!'),
					},
				]}
			>
				<InputNumber
					style={{ width: '100%' }}
					placeholder='Nhập số lượng sản phẩm'
					onChange={(value: any) => {
						setThongTinNguoiDungNhap({ ...thongTinNguoiDungNhap, quantity: value });
					}}
				/>
			</Form.Item>

			<Form.Item>
				<Button type='primary' htmlType='submit' onClick={submit}>
					Thêm sản phẩm
				</Button>
			</Form.Item>
		</Form>
	);
};

export default FormSanPham;
