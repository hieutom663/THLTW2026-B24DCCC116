import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';

const FormSanPham: React.FC = () => {
	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		console.log('Form values:', values);
	};

	return (
		<Form form={form} layout='vertical' onFinish={onFinish}>
			<Form.Item label='Tên sản phẩm' name='name' rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}>
				<Input placeholder='Nhập tên sản phẩm' />
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
				<InputNumber style={{ width: '100%' }} placeholder='Nhập giá sản phẩm' />
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
				<InputNumber style={{ width: '100%' }} placeholder='Nhập số lượng sản phẩm' />
			</Form.Item>

			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Thêm sản phẩm
				</Button>
			</Form.Item>
		</Form>
	);
};

export default FormSanPham;
