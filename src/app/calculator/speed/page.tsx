'use client'
import { Button, Card, Table } from "antd";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { createContext, useContext, useMemo, useState } from "react";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { HolderOutlined } from "@ant-design/icons";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { ColumnsType } from "antd/es/table";
import { CSS } from "@dnd-kit/utilities";

interface RowContextProps {
    setActivatorNodeRef?: (element: HTMLElement | null) => void;
    listeners?: SyntheticListenerMap;
}

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
}

const RowContext = createContext<RowContextProps>({});

const columns: ColumnsType<DataType> = [
    { key: 'sort', align: 'center', width: 80, render: () => <DragHandle /> },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Age', dataIndex: 'age' },
    { title: 'Address', dataIndex: 'address' },
];
const initialData: DataType[] = [
    { key: '1', name: 'John Brown', age: 32, address: 'Long text Long' },
    { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
    { key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park' },
]

const DragHandle = () => {
    const { setActivatorNodeRef, listeners } = useContext(RowContext);
    return (
        <Button
          type="text"
          size="small"
          icon={<HolderOutlined />}
          style={{ cursor: 'move' }}
          ref={setActivatorNodeRef}
          {...listeners}
        />
    );
};

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    'data-row-key': string;
  }
  
  const Row: React.FC<RowProps> = (props) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      setActivatorNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: props['data-row-key'] });
  
    const style: React.CSSProperties = {
      ...props.style,
      transform: CSS.Translate.toString(transform),
      transition,
      ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
    };
  
    const contextValue = useMemo<RowContextProps>(
      () => ({ setActivatorNodeRef, listeners }),
      [setActivatorNodeRef, listeners],
    );
  
    return (
      <RowContext.Provider value={contextValue}>
        <tr {...props} ref={setNodeRef} style={style} {...attributes} />
      </RowContext.Provider>
    );
};

const MonsterPage = () => {
    const [dataSource, setDataSource] = useState<DataType[]>(initialData);

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (active.id !== over?.id) {
          setDataSource((prevState) => {
            const activeIndex = prevState.findIndex((record) => record.key === active?.id);
            const overIndex = prevState.findIndex((record) => record.key === over?.id);
            return arrayMove(prevState, activeIndex, overIndex);
          });
        }
      };

    return (
        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
            <SortableContext items={dataSource.map((i) => i.key)} strategy={verticalListSortingStrategy}>
                <Card>
                    <Table
                        rowKey="key"
                        components={{ body: { row: Row } }}
                        columns={columns}
                        dataSource={dataSource}
                    />
                </Card>
            </SortableContext>
        </DndContext>
    );
};

export default MonsterPage;
