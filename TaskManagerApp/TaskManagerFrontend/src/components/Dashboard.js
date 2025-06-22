import React, { useState, useEffect } from "react";
import api from "../services/api";
import TaskForm from "./TaskForm";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: "", priority: "" });
  const [search, setSearch] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;
      if (search.trim()) params.search = search.trim();

      const res = await api.get("/tasks", { params });
      setTasks(res.data);
    } catch (error) {
      alert("Failed to fetch tasks");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [filters, search]);

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch {
      alert("Failed to delete task");
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h2 className="mb-3 mb-md-0">Tasks Dashboard</h2>
        <button className="btn btn-primary" onClick={() => setEditingTask({})}>
          <i className="bi bi-plus-lg me-1"></i> New Task
        </button>
      </div>

      <div className="card shadow-sm p-3 mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-4">
            <input
              type="search"
              className="form-control"
              placeholder="Search by title or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-6 col-md-3">
            <select
              className="form-select"
              value={filters.status}
              onChange={(e) =>
                setFilters((f) => ({ ...f, status: e.target.value }))
              }
            >
              <option value="">All Status</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div className="col-6 col-md-3">
            <select
              className="form-select"
              value={filters.priority}
              onChange={(e) =>
                setFilters((f) => ({ ...f, priority: e.target.value }))
              }
            >
              <option value="">All Priority</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div className="col-12 col-md-2 d-grid">
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                setFilters({ status: "", priority: "" });
                setSearch("");
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3">Loading tasks...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="alert alert-warning text-center" role="alert">
          No tasks found.
        </div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle mb-0 bg-white">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Priority</th>
                <th style={{ width: "140px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <tr key={t.id}>
                  <td>{t.title}</td>
                  <td>{t.description}</td>
                  <td>
                    <span
                      className={`badge ${
                        t.status === "Completed"
                          ? "bg-success"
                          : t.status === "In Progress"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        t.priority === "High"
                          ? "bg-danger"
                          : t.priority === "Medium"
                          ? "bg-info text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {t.priority}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-warning me-2"
                      onClick={() => setEditingTask(t)}
                      title="Edit Task"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteTask(t.id)}
                      title="Delete Task"
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingTask && (
        <TaskForm
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSaved={() => {
            setEditingTask(null);
            fetchTasks();
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
