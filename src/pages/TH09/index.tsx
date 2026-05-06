import { useState, useEffect } from 'react';
import { Tabs, Layout } from 'antd';
import Dashboard from './components/Dashboard';
import KanbanBoard from './components/KanbanBoard';
import TaskList from './components/TaskList';
import type { Task } from './components/Data';

const { Content } = Layout;

const App = () => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    return (
        <Layout style={{ minHeight: '100vh', padding: '20px' }}>
            <Content style={{ background: '#fff', padding: '24px', borderRadius: '8px' }}>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Dashboard" key="1">
                        <Dashboard tasks={tasks} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Kanban Board" key="2">
                        <KanbanBoard tasks={tasks} setTasks={setTasks} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Danh sách Task" key="3">
                        <TaskList tasks={tasks} setTasks={setTasks} />
                    </Tabs.TabPane>
                </Tabs>
            </Content>
        </Layout>
    );
};

export default App;