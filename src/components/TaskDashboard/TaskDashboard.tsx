import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../hooks.ts";
import {Task} from "../../redux/slices/todoSlice.ts";
import {Container, Stack} from "react-bootstrap";
import s from './TaskDashboard.module.scss';
import cn from "classnames";

const TaskDashboard: React.FC = () => {
    const tasks = useAppSelector(state => state.todo.tasks);
    const [activeTasks, setActiveTasks] = useState<Task[]>([]);
    const [doneTasks, setDoneTasks] = useState<Task[]>([]);

    useEffect(() => {
        setActiveTasks(() => tasks.filter(item => item.isDone === "активне"));
        setDoneTasks(() => tasks.filter(item => item.isDone === "виконане"));
    }, [tasks])

    return (
        <Container className={s.container}>
                <h1 className="header text-primary fw-bold text-center mb-4">Прогрес виконання</h1>

            <Stack direction="horizontal" gap={3} style={{justifyContent: "space-around", flexWrap: "wrap"}}>

                <Stack gap={3} style={{maxWidth: "200px"}}>
                    <h3 className="text-primary text-center">Створено</h3>
                    <Stack className={cn(s.informBlock, s.allTaskBlock)}>
                        <p className='fs-1 text-primary'>{tasks.length || 0}</p>
                        <p className='fs-4 text-primary'>{tasks.length === 1 ? "завдання" : "завдань"}</p>
                    </Stack>
                </Stack>

                <Stack gap={3} style={{maxWidth: "200px"}}>
                    <h3 className="text-secondary text-center">Активних</h3>
                    <Stack className={cn(s.informBlock, s.activeTaskBlock)}>
                        <p className='fs-1 text-secondary'>{activeTasks.length || 0}</p>
                        <p className='fs-4 text-secondary'>{activeTasks.length === 1 ? "завдання" : "завдань"}</p>
                    </Stack>
                </Stack>

                <Stack gap={3} style={{maxWidth: "200px"}}>
                    <h3 className="text-danger text-center">Виконано</h3>
                    <Stack className={cn(s.informBlock, s.doneTaskBlock)}>
                        <p className='fs-1 text-danger'>{doneTasks.length || 0}</p>
                        <p className='fs-4 text-danger'>{doneTasks.length === 1 ? "завдання" : "завдань"}</p>
                    </Stack>
                </Stack>

            </Stack>
        </Container>
    );
};

export default TaskDashboard;