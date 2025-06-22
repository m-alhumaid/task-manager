import React, { useState, useEffect } from "react";
import api from "../services/api";

const TaskForm = ({ task, onClose, onSaved }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "Pending",
        priority: task.priority || "Medium",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (task?.id) {
        await api.put(`/tasks/${task.id}`, form);
      } else {
        await api.post("/tasks", form);
      }
      onSaved();
      onClose();
    } catch (error) {
      alert("Failed to save task");
    }
    setSaving(false);
  };

  return (
    <div
      className="modal show fade d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content shadow">
          <div className="modal-header">
            <h5 className="modal-title">
              {task?.id ? "Edit Task" : "New Task"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label fw-semibold">Title</label>
                <input
                  name="title"
                  type="text"
                  className="form-control"
                  value={form.title}
                  onChange={handleChange}
                  required
                  autoFocus
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="3"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Status</label>
                <select
                  name="status"
                  className="form-select"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Priority</label>
                <select
                  name="priority"
                  className="form-select"
                  value={form.priority}
                  onChange={handleChange}
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Saving...
                  </>
                ) : (
                  "Save Task"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
