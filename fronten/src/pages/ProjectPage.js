import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

function ProjectPage() {
  const { id } = useParams();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchTasks = async () => {
    const res = await API.get(`/task/${id}`);
    setTasks(res.data);
  };

  const createTask = async () => {
    if (!title) {
      alert("Enter task title");
      return;
    }

    await API.post("/task/create", {
      title,
      projectId: id,
      assignedTo: user._id
    });

    setTitle("");
    fetchTasks();
  };

  const updateStatus = async (taskId, status) => {
    await API.put(`/task/update/${taskId}`, { status });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "20px"
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "auto",
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}
      >
        <h2 style={{ textAlign: "center" }}>Project Tasks</h2>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />
          <button onClick={createTask} style={buttonStyle}>
            Add
          </button>
        </div>

        <h3 style={{ marginTop: "20px" }}>Tasks</h3>

        {tasks.map((t) => (
          <div key={t._id} style={cardStyle}>
            <p>
              <strong>{t.title}</strong> — {t.status}
            </p>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => updateStatus(t._id, "in-progress")}
                style={secondaryBtn}
              >
                In Progress
              </button>

              <button
                onClick={() => updateStatus(t._id, "done")}
                style={buttonStyle}
              >
                Done
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  flex: 1,
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  padding: "10px",
  background: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const secondaryBtn = {
  padding: "10px",
  background: "#2196F3",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const cardStyle = {
  padding: "12px",
  marginTop: "10px",
  background: "#f9fafb",
  borderRadius: "5px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
};

export default ProjectPage;