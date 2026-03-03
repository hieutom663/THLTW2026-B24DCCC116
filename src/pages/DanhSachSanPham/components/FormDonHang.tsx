import { Form, Input, InputNumber, Button, Select } from 'antd';
import { useState } from 'react';
// import type { donHang } from './Data';
import { dataSource } from './Data';

const FormDonHang = () => {
	// const { danhSachDonHang, setDanhSachDonHang } = props;
	const [selectedPr, setSelectedPr] = useState<string[]>([]);
	const onFinish = (values: any) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<>
			<h1>Thêm đơn hàng</h1>

			<Form
				name='basic'
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete='off'
			>
				<Form.Item
					label='Chọn sản phẩm'
					name='chonSanPham'
					rules={[{ required: true, message: 'Vui lòng chọn sản phẩm!' }]}
				>
					<Select
						mode='multiple'
						placeholder='Chọn sản phẩm'
						style={{ width: '100%' }}
						value={selectedPr}
						onChange={(values) => setSelectedPr(values)}
						options={dataSource.map((p) => ({
							value: p.name,
							label: p.name,
						}))}
					/>
				</Form.Item>
				<h3>Số lượng sản phẩm</h3>
				{selectedPr.map((s) => (
					<Form.Item
						key={s}
						label={s}
						name={s}
						rules={[{ required: true, message: 'Vui lòng nhập số lượng sản phẩm!' }]}
					>
						{' '}
						<InputNumber key={s} placeholder='Số lượng' />{' '}
					</Form.Item>
				))}
				<Form.Item
					label='Password'
					name='password'
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default FormDonHang;
