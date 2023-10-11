import React from 'react';
import {useAppDispatch} from "../../hooks";
import {deleteTask, editTask, Task} from "../../redux/slices/todoSlice";
import {Form} from 'react-bootstrap';

interface TaskItemProps {
    item: Task;
    changeTask: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({item, changeTask}) => {

    const tdStyle = {
        textDecoration: item.isDone === 'виконане' ? 'line-through' : 'none',
        verticalAlign: 'middle'
    }
    const dispatch = useAppDispatch();
    const removeTask = () => {
        dispatch(deleteTask(item.id));
    }

    const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value:"виконане" | "активне"  = e.target.value as "виконане" | "активне";
        const {id, taskName, taskContent, createdDate} = item;
        const newDataObj: Task = {id, taskName, createdDate, taskContent, isDone: value}
        dispatch(editTask(newDataObj));
    }

    return (
        <>
            <tr>
                <td style={tdStyle}>
                    {item.taskName}
                </td>
                <td style={tdStyle} className="text-center">
                    {item.createdDate}
                </td>
                <td>
                    <Form.Select defaultValue={item.isDone} onChange={handleChangeStatus}>
                        <option value="активне">активне</option>
                        <option value="виконане">виконане</option>
                    </Form.Select>
                </td>
                <td style={tdStyle}>
                    {item.taskContent}
                </td>
                <td style={{verticalAlign: 'middle'}}>
                    <i className="bi bi-pen-fill m-lg-3 text-primary" style={{ cursor: 'pointer'}} onClick={changeTask}></i>
                    <i className="bi bi-archive-fill text-danger" style={{ cursor: 'pointer' }} onClick={removeTask}></i>
                </td>
            </tr>
        </>

    );
};

export default TaskItem;