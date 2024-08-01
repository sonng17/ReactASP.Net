import { useState } from "react";
import axios from "axios";
import Button from "../Button";

const AddModal = ({ fetchData, toggleForm }) => {
  const [name, setName] = useState("");
  const [employeeCount, setEmployeeCount] = useState();
  //Post API
  const handleSubmit = (event) => {
    event.preventDefault(); // dừng tải lại trang

    const newDepartment = {
      name: name,
      employeeCount: employeeCount,
    };

    axios
      .post("https://localhost:7183/api/departments", newDepartment)
      .then(() => {
        fetchData();
        toggleForm();

        // Reset form fields
        setName("");
        setEmployeeCount(null);
      })
      .catch((error) => {
        console.error("Error creating department:", error);
        alert("Failed to create department.");
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="employeeCount">Employee Count:</label>
          <input
            type="number"
            id="employeeCount"
            value={employeeCount}
            onChange={(e) => setEmployeeCount(e.target.value)}
            required
          />
        </div>
        <Button
          label="Add"
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

export default AddModal;
