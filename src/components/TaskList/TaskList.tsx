import React, { useState, useMemo } from 'react';
import { useAppSelector } from "../../hooks";
import { Task } from "../../redux/slices/todoSlice";
import { Table, Form } from 'react-bootstrap';
import TaskItem from "../TaskItem";
import ChangingTaskForm from "../ChangingTaskForm";

const TaskList: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [filterValue, setFilterValue] = useState<"all" | "active" | "done">("all");
    const tasks = useAppSelector(state => state.todo.tasks);

    const filteredTasks = useMemo(() => {
        if (filterValue === "all") {
            return tasks;
        } else if (filterValue === "active") {
            return tasks.filter(task => task.isDone === 'активне');
        } else if (filterValue === "done") {
            return tasks.filter(task => task.isDone === 'виконане');
        }
        return tasks;
    }, [filterValue, tasks]);

    const openModal = (task:Task) => {
        setSelectedTask(task);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedTask(null);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value: "all" | "active" | "done" = e.target.value as "all" | "active" | "done";
        setFilterValue(value);
    };

    return (
        <>

            <Form.Select className="mb-4 text-primary fw-bold" style={{ width: "250px" }} onChange={handleFilterChange} value={filterValue} >
                <option value="all" className="text-primary fw-bold">Всі завдання</option>
                <option value="active" className="text-primary fw-bold">Активні завдання</option>
                <option value="done" className="text-primary fw-bold">Виконанні завдання</option>
            </Form.Select>
            <Table striped bordered hover responsive>
                <thead>
                <tr className="text-center">
                    <th>Hазва</th>
                    <th>Дата створення</th>
                    <th>Статус</th>
                    <th>Опис</th>
                    <th>Дії</th>
                </tr>
                </thead>
                <tbody>
                {filteredTasks.length > 0 && filteredTasks.map(item => <TaskItem key={item.id} item={item} changeTask={() => openModal(item)} />)}
                </tbody>
            </Table>
            {filteredTasks.length === 0 && <h3 className="text-center m-2">Задачі відсутні</h3>}
            {isModalOpen && <ChangingTaskForm isModalOpen={isModalOpen} closeModal={closeModal}
                // @ts-expect-error We are intentionally ignoring a type error here because type of taskData is not null
                                              taskData={selectedTask} />}
        </>
    );
};

export default TaskList;
