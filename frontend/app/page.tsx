"use client";
import Image from "next/image";

import { useEffect, useState } from "react";
import { Task } from "@/types/task";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "@/services/taskServices";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {

    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch {
      alert("Gagal mengambil data");
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (editId) {
        await updateTask(editId, {
          judul,
          deskripsi,
          status: tasks.find((t) => t.id === editId)?.status ?? "pending",
        });
      } else {
        await createTask({
          judul,
          deskripsi,
          status: "pending",
        });
      }

      setJudul("");
      setDeskripsi("");
      setEditId(null);

      await fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan Task");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Apakah anda yakin menghapus Task ?");
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      await deleteTask(id);
      await fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus task");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (task: Task) => {
    setEditId(task.id);
    setJudul(task.judul);
    setDeskripsi(task.deskripsi);
  };

  const handleToggleStatus = async (task: Task) => {
    setTogglingId(task.id);
    try {
      await updateTask(task.id, {
        judul: task.judul,
        deskripsi: task.deskripsi,
        status: task.status === "pending" ? "done" : "pending",
      });

      await fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Gagal mengupdate status");
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <main className="w-full mx-auto p-8 bg-[#e9e7e8] min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-[#4F4F4F]">
        Todo App - MPI TEST
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mb-8 border border-[#A6A6A6] rounded-lg p-5 shadow bg-white"
      >
        <h2 className="text-xl font-semibold mb-4 text-[#4F4F4F]">
          Tambah Task Baru
        </h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="judul"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className="w-full border border-[#A6A6A6] rounded p-3 focus:outline-none focus:border-[#00A1FF] focus:ring-1 focus:ring-[#00A1FF] text-[#4F4F4F] placeholder-[#A6A6A6]"
            required
          />
        </div>

        <div className="mb-4">
          <textarea
            placeholder="deskripsi"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className="w-full border border-[#A6A6A6] rounded p-3 focus:outline-none focus:border-[#00A1FF] focus:ring-1 focus:ring-[#00A1FF] text-[#4F4F4F] placeholder-[#A6A6A6]"
            rows={4}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#00A1FF] text-white px-5 py-2 rounded hover:bg-[#0088DD] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading
            ? editId
              ?  <div className="w-6 h-6 border-4 border-[#32A071] border-t-transparent rounded-full animate-spin"></div>
              :  <div className="w-6 h-6 border-4 border-[#32A071] border-t-transparent rounded-full animate-spin"></div>
            : editId
            ? "Update Task"
            : "Tambah Task"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setJudul("");
              setDeskripsi("");
            }}
            className="bg-[#4F4F4F] text-white px-5 py-2 rounded ml-2 hover:bg-[#3a3a3a] transition-colors"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="space-y-4">
        {/* {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-6 h-6 border-4 border-[#32A071] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) :  */
        
        tasks.length === 0 ? (
          <p className="text-[#A6A6A6] text-center py-10">
            Tidak ada task saat ini
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="border border-[#A6A6A6] rounded-lg p-4 shadow bg-white"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <input
                    type="checkbox"
                    checked={task.status === "done"}
                    onChange={() => handleToggleStatus(task)}
                    disabled={togglingId === task.id}
                    className="w-5 h-5 accent-[#32A071] disabled:opacity-50 cursor-pointer"
                  />
                  <h2
                    className={`text-xl font-semibold text-[#4F4F4F] ${
                      task.status === "done"
                        ? "line-through text-[#A6A6A6]"
                        : ""
                    }`}
                  >
                    {task.judul}
                  </h2>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    task.status === "done" ? "bg-[#32A071]" : "bg-[#FFA500]"
                  }`}
                >
                  {task.status}
                </span>
              </div>

              <p
                className={`mt-2 ${
                  task.status === "done"
                    ? "line-through text-[#A6A6A6]"
                    : "text-[#4F4F4F]"
                }`}
              >
                {task.deskripsi}
              </p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="bg-[#00A1FF] hover:bg-[#0088DD] text-white px-4 py-2 rounded transition-colors cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(task.id)}
                  disabled={deletingId === task.id}
                  className="bg-[#FF3A44] hover:bg-[#D52E36] text-white px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {deletingId === task.id ? "Menghapus..." : "Delete"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
