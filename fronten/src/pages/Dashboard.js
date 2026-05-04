import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchProjects = async () => {
    const res = await API.get("/project");
    setProjects(res.data);
  };

  const createProject = async () => {
    if (!name) {
      alert("Enter project name");
      return;
    }

    await API.post("/project/create", {
      name,
      createdBy: user._id
    });

    setName("");
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
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
        <h2 style={{ textAlign: "center" }}>Dashboard</h2>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <input
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
          <button onClick={createProject} style={buttonStyle}>
            Add
          </button>
        </div>

        <h3 style={{ marginTop: "20px" }}>Projects</h3>

        {projects.map((p) => (
          <div
            key={p._id}
            onClick={() => navigate(`/project/${p._id}`)}
            style={cardStyle}
          >
            {p.name}
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
  padding: "10px 15px",
  background: "#4CAF50",
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
  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  cursor: "pointer"
};

export default Dashboard;