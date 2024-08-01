import { useEffect, useState } from "react";
import axios from "axios";
import AddModal from "./DepartmentComponent/AddModal";
import EditModal from "./DepartmentComponent/EditModal";
import Button from "./Button";

const DepartmentTable = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Post API
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  //Put API
  const [editDepartmentId, setEditDepartmentId] = useState();
  const [showEditForm, setShowEditForm] = useState(false);
  const toggleEditForm = () => {
    setShowEditForm(!showEditForm);
  };
  const handleEditButton = (id) => {
    setEditDepartmentId(id);
    toggleEditForm();
  };

  //Delete API
  const handleDeleteButton = (departmentId) => {
    try {
      axios
        .delete(`https://localhost:7183/api/departments/${departmentId}`)
        .then(() => {
          fetchData();
        });
    } catch (error) {
      console.error("Failed to delete department:", error);
      alert("Failed to delete department.");
    }
  };

  //Get API
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://localhost:7183/api/departments"
      );
      setDepartments(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <div className="department-list">
        <div></div>
        <h1>Department List</h1>
        <div className="func">
          <div className="btn">
            <Button
              label={!showForm ? "Add Department" : "Hide"}
              onClick={() => toggleForm()}
              style={{
                backgroundColor: "blue",
                color: "white",
              }}
            />
          </div>
          <div className="display">
            {" "}
            {showForm && (
              <AddModal
                fetchData={fetchData}
                onClose={toggleForm}
                toggleForm={toggleForm}
              />
            )}
            {showEditForm && (
              <EditModal
                fetchData={fetchData}
                editDepartmentId={editDepartmentId}
                onClose={toggleEditForm}
                toggleEditForm={toggleEditForm}
              />
            )}
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Employee Count</th>
              <th>Function</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => (
              <tr key={department.id}>
                <td>{department.id}</td>
                <td>{department.name}</td>
                <td>{department.employeeCount}</td>
                <td>
                  <Button
                    label="Edit"
                    onClick={() => handleEditButton(department.id)}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "yellow",
                      color: "black",
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                  />
                  <Button
                    label="Delete"
                    onClick={() => handleDeleteButton(department.id)}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "red",
                      color: "black",
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentTable;
