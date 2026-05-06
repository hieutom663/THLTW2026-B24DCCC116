import { useState } from 'react';
import { Button, Table, Modal, Form, Input, Select, DatePicker, Space, Tag, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import type { Task } from './Data';

interface Props {
    tasks: Task[];
    setTasks: any;
}

const TaskList = ({ tasks, setTasks }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);

    const handleAddTask = () => {
        setEditingTask(null);
        form.resetFields();
        form.setFieldsValue({ trangThai: 'Cần làm', uuTien: 'Trung bình' });
        setIsModalOpen(true);
    };

    const handleEditTask = (task: Task) => {
        setEditingTask(task);
        form.setFieldsValue({
            ...task,
            deadline: dayjs(task.deadline)
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const handleFinish = (values: any) => {
        const newTask: Task = {
            id: editingTask ? editingTask.id : Date.now().toString(),
            tenTask: values.tenTask,
            moTa: values.moTa,
            deadline: values.deadline.toISOString(),
            uuTien: values.uuTien,
            tag: values.tag,
            trangThai: values.trangThai || 'Cần làm'
        };

        if (editingTask) {
            setTasks(tasks.map(t => (t.id === editingTask.id ? newTask : t)));
        } else {
            setTasks([...tasks, newTask]);
        }
        setIsModalOpen(false);
    };

    const filteredTasks = tasks.filter(t => {
        const matchName = t.tenTask.toLowerCase().includes(searchText.toLowerCase());
        const matchStatus = filterStatus ? t.trangThai === filterStatus : true;
        return matchName && matchStatus;
    });

    const columns = [
        { title: 'Tên task', dataIndex: 'tenTask', key: 'tenTask' },
        { title: 'Mô tả', dataIndex: 'moTa', key: 'moTa' },
        { 
            title: 'Deadline', 
            dataIndex: 'deadline', 
            key: 'deadline',
            render: (text: string) => dayjs(text).format('DD/MM/YYYY'),
            sorter: (a: Task, b: Task) => dayjs(a.deadline).unix() - dayjs(b.deadline).unix()
        },
        { 
            title: 'Mức độ ưu tiên', 
            dataIndex: 'uuTien', 
            key: 'uuTien',
            render: (text: string) => (
                <Tag color={text === 'Cao' ? 'red' : text === 'Trung bình' ? 'orange' : 'blue'}>{text}</Tag>
            )
        },
        { title: 'Tag', dataIndex: 'tag', key: 'tag' },
        { title: 'Trạng thái', dataIndex: 'trangThai', key: 'trangThai' },
        {
            title: 'Hành động',
            key: 'action',
            render: (_: any, record: Task) => (
                <Space>
                    <Button type="link" onClick={() => handleEditTask(record)}>Sửa</Button>
                    <Popconfirm title="Xóa task?" onConfirm={() => handleDelete(record.id)}>
                        <Button type="link" danger>Xóa</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <>
            <Space style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={handleAddTask}>Thêm task</Button>
                <Input.Search 
                    placeholder="Tìm kiếm..." 
                    onSearch={value => setSearchText(value)} 
                    onChange={e => setSearchText(e.target.value)}
                    style={{ width: 200 }} 
                />
                <Select 
                    placeholder="Lọc trạng thái" 
                    allowClear 
                    onChange={value => setFilterStatus(value)}
                    style={{ width: 150 }}
                >
                    <Select.Option value="Cần làm">Cần làm</Select.Option>
                    <Select.Option value="Đang làm">Đang làm</Select.Option>
                    <Select.Option value="Hoàn thành">Hoàn thành</Select.Option>
                </Select>
            </Space>

            <Table dataSource={filteredTasks} columns={columns} rowKey="id" />

            <Modal title={editingTask ? 'Sửa task' : 'Thêm task'} visible={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => form.submit()}>
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Form.Item name="tenTask" label="Tên task" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="moTa" label="Mô tả"><Input.TextArea /></Form.Item>
                    <Form.Item name="deadline" label="Deadline" rules={[{ required: true }]}><DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" /></Form.Item>
                    <Form.Item name="uuTien" label="Mức độ ưu tiên">
                        <Select>
                            <Select.Option value="Cao">Cao</Select.Option>
                            <Select.Option value="Trung bình">Trung bình</Select.Option>
                            <Select.Option value="Thấp">Thấp</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="tag" label="Tag"><Input /></Form.Item>
                    {editingTask && (
                        <Form.Item name="trangThai" label="Trạng thái">
                            <Select>
                                <Select.Option value="Cần làm">Cần làm</Select.Option>
                                <Select.Option value="Đang làm">Đang làm</Select.Option>
                                <Select.Option value="Hoàn thành">Hoàn thành</Select.Option>
                            </Select>
                        </Form.Item>
                    )}
                </Form>
            </Modal>
        </>
    );
};

export default TaskList;