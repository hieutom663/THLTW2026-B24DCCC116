import { Card } from 'antd';
import './components/style.less';
import ProductTable from './components/ProductTable';
import { Button } from 'antd';

const TrangChu: React.FC = () => {
	return (
		<>
			<Card bodyStyle={{ height: '100%' }}>
				<div className='home-welcome'>
					<h1 className='title'>DANH SÁCH SẢN PHẨM</h1>
					<ProductTable />
					<Button>Thêm sản phẩm</Button>
				</div>
			</Card>
		</>
	);
};

export default TrangChu;
