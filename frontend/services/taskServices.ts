import api from "./api";
import { Task } from "@/types/task";

export const getTasks = async (): Promise<Task[]> => {
    const res = await api.get("/tasks");
    return res.data.data;
};

export const createTask = async (data: Partial<Task>) => {
    return await api.post("/tasks", data);
};

export const updateTask = async (
    id: number,
    data: Partial<Task>
) => {
    return await api.put(`/tasks/${id}`, data);
};

export const deleteTask = async (id: number) => {
    return await api.delete(`/tasks/${id}`);
};