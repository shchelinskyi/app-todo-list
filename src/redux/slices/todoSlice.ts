import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type Task = {
    id: number;
    taskName: string,
    createdDate: string,
    taskContent: string,
    isDone: "виконане" | "активне"
}

type TasksState = {
    tasks: Task[];
}

const initialState: TasksState = {
    tasks: [
        {
            id: 1690743110215,
            taskName: "Підготувати презентацію",
            createdDate: "10.10.2023",
            taskContent: "При підготовці використати Canva або PowerPoint",
            isDone: "активне"
        },
        {
            id: 1690743110216,
            taskName: "Запровадити розумну систему керування будинком",
            createdDate: "20.09.2023",
            taskContent: "Освітлення, розумні розетки",
            isDone: "активне"
        },
        {
            id: 1690743110217,
            taskName: "Завершити написання квартального звіту",
            createdDate: "03.10.2023",
            taskContent: "Кінцевий термі 03.11.2023",
            isDone: "активне"
        },
        {
            id: 1690743110218,
            taskName: "Розробити додаток для вивчення англійської мови",
            createdDate: "05.10.2023",
            taskContent: "Використати наступні технології: React Native, MUI",
            isDone: "виконане"
        },
        {
            id: 1690743110219,
            taskName: "Прочитати книгу про JavaScript",
            createdDate: "08.10.2023",
            taskContent: "A Smarter Way to Learn JavaScript",
            isDone: "активне"
        },
        {
            id: 1690743110224,
            taskName: "Купити подарунок сестрі",
            createdDate: "10.10.2023",
            taskContent: "Смарт годинник або мобільний телефон",
            isDone: "виконане"
        },
    ],
};

const todoSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.unshift(action.payload);
        },
        editTask: (state, action: PayloadAction<Task>) => {
            const {
                id,
                taskName,
                createdDate,
                taskContent,
                isDone,
            } = action.payload;

            const currentTask = state.tasks.find((task) => task.id === id);

            if (currentTask) {
                currentTask.taskName = taskName;
                currentTask.createdDate = createdDate;
                currentTask.taskContent = taskContent;
                currentTask.isDone = isDone;
            }
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            const taskItem = state.tasks.find((task) => task.id === action.payload)
            if (taskItem) {
                state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            }
        },
    }
})

export const {
    addTask,
    editTask,
    deleteTask,
} = todoSlice.actions;

export default todoSlice.reducer;