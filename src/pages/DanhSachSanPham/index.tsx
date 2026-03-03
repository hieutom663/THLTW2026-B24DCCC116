import Bang from './components/Bang';
import DanhSachDonHang from './components/DanhSachDonHang';
import { Tabs } from 'antd';

const DanhSachSanPham = () => {
	return (
		<>
			<Tabs defaultActiveKey='1'>
				{' '}
				<Tabs.TabPane tab='Danh sách sản phẩm' key='1'>
					<Bang />
				</Tabs.TabPane>{' '}
				<Tabs.TabPane tab='Danh sách đơn hàng' key='2'>
					<DanhSachDonHang />
				</Tabs.TabPane>{' '}
			</Tabs>
		</>
	);
};
export default DanhSachSanPham;
