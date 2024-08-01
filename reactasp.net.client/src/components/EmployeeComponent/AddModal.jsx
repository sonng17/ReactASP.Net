import { useState } from "react";
import axios from "axios";
import Button from "../Button";

const AddModal = ({ fetchData, toggleForm }) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState([]);

  //Post API
  const handleSubmit = (event) => {
    event.preventDefault(); // dừng tải lại trang

    const newEmployee = {
      name: name,
      title: title,
      department: department,
    };

    axios
      .post("https://localhost:7183/api/employees", newEmployee)
      .then(() => {
        fetchData();
        toggleForm();
        // Reset form fields
        setName("");
        setTitle("");
      })
      .catch((error) => {
        console.error("Error creating employee:", error);
        alert("Failed to create employee.");
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
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
