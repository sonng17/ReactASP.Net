import { useState } from "react";
import axios from "axios";
import Button from "../Button";

const EditModal = ({ editEmployeeId, fetchData, toggleEditForm }) => {
  const [editName, setEditName] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editdepartment, setEditDepartment] = useState([]);

  //Put API
  const handleSubmit = (event) => {
    event.preventDefault();

    const editedEmployee = {
      id: editEmployeeId,
      name: editName,
      title: editTitle,
      department: editdepartment,
    };
    axios
      .put(
        `https://localhost:7183/api/employees/${editEmployeeId}`,
        editedEmployee
      )
      .then(() => {
        fetchData();
        toggleEditForm();
        setEditName("");
        setEditTitle("");
      })
      .catch((error) => {
        console.error("Error editing employee:", error);
        alert("Failed to edit employee.");
      });
  };

  return (
    <div>
      <form
        onSubmit={() => handleSubmit()}
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            required
          />
        </div>
        <Button
          label="Edit"
          onClick={handleSubmit}
          style={{
            padding: "10px 20px",
            backgroundColor: "gray",
            color: "white",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        />
      </form>
    </div>
  );
};

export default EditModal;
