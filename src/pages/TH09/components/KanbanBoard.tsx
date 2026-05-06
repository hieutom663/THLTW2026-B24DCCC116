
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Card, Tag } from 'antd';
import type { Task } from './Data';

interface Props {
    tasks: Task[];
    setTasks: any;
}

const COLUMNS = ['Cần làm', 'Đang làm', 'Hoàn thành'] as const;

const KanbanBoard: React.FC<Props> = ({ tasks, setTasks }: Props) => {
    
    const onDragEnd = (result: DropResult) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        const updatedTasks = tasks.map(task => {
            if (task.id === draggableId) {
                return { ...task, trangThai: destination.droppableId as Task['trangThai'] };
            }
            return task;
        });

        setTasks(updatedTasks);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={{ display: 'flex', gap: '20px' }}>
                {COLUMNS.map(columnId => {
                    const columnTasks = tasks.filter(t => t.trangThai === columnId);

                    return (
                        <div key={columnId} style={{ flex: 1, background: '#f4f5f7', padding: '16px', borderRadius: '8px', minHeight: '400px' }}>
                            <h3>{columnId} ({columnTasks.length})</h3>
                            <Droppable droppableId={columnId}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: '300px' }}>
                                        {columnTasks.map((task, index) => (
                                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{
                                                            ...provided.draggableProps.style,
                                                            marginBottom: '12px'
                                                        }}
                                                    >
                                                        <Card size="small" title={task.tenTask} extra={<Tag color="blue">{task.tag}</Tag>}>
                                                            <p style={{ color: '#666', fontSize: '13px' }}>{task.moTa}</p>
                                                            <p style={{ margin: 0, fontWeight: 'bold' }}>
                                                                Ưu tiên: <span style={{ color: task.uuTien === 'Cao' ? 'red' : 'inherit' }}>{task.uuTien}</span>
                                                            </p>
                                                        </Card>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    );
                })}
            </div>
        </DragDropContext>
    );
};

export default KanbanBoard;