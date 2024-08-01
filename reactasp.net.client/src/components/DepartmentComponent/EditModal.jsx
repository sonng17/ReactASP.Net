import { useState } from "react";
import axios from "axios";
import Button from "../Button";

const EditModal = ({ editDepartmentId, fetchData, toggleEditForm }) => {
  const [editName, setEditName] = useState("");
  const [editEmployeeCount, setEditEmployeeCount] = useState();

  //Put API
  const handleSubmit = (event) => {
    event.preventDefault();

    const editedDepartment = {
      id: editDepartmentId,
      name: editName,
      employeeCount: editEmployeeCount,
    };
    axios
      .put(
        `https://localhost:7183/api/departments/${editDepartmentId}`,
        editedDepartment
      )
      .then(() => {
        fetchData();
        toggleEditForm();
        setEditName("");
        setEditEmployeeCount(null);
      })
      .catch((error) => {
        console.error("Error editing department:", error);
        alert("Failed to edit department.");
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
          <label htmlFor="employeeCount">Employee Count:</label>
          <input
            type="number"
            id="employeeCount"
            value={editEmployeeCount}
            onChange={(e) => setEditEmployeeCount(e.target.value)}
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
