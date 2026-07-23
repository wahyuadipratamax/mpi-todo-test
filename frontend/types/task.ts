export interface Task {
    id: number;
    judul: string;
    deskripsi: string;
    status: "pending" | "done";
}