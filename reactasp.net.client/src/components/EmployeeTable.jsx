import { useEffect, useState } from "react";
import axios from "axios";
import Button from "./Button";
import AddModal from "./EmployeeComponent/AddModal";
import EditModal from "./EmployeeComponent/EditModal";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Post API
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  //Put API
  const [editEmployeeId, setEditEmployeeId] = useState();
  const [showEditForm, setShowEditForm] = useState(false);
  const toggleEditForm = () => {
    setShowEditForm(!showEditForm);
  };
  const handleEditButton = (id) => {
    setEditEmployeeId(id);
    toggleEditForm();
  };

  //Delete API
  const handleDeleteButton = (employeeId) => {
    try {
      axios
        .delete(`https://localhost:7183/api/employees/${employeeId}`)
        .then(() => {
          fetchData();
        });
    } catch (error) {
      console.error("Failed to delete item:", error);
      alert("Failed to delete item.");
    }
  };

  //Get API
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://localhost:7183/api/employees");
      setEmployees(response.data);
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
      <div className="employee-list">
        <h1>Employee List</h1>
        <div className="func">
          <div className="btn">
            <Button
              label={!showForm ? "Add Employee" : "Hide"}
              onClick={() => toggleForm()}
              style={{
                backgroundColor: "blue",
                color: "white",
              }}
            />
          </div>
          <div className="display">
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
                editEmployeeId={editEmployeeId}
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
              <th>Title</th>
              <th>Department</th>
              <th>Function</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.title}</td>
                <td>{employee.department}</td>
                <td>
                  <Button
                    label="Edit"
                    onClick={() => handleEditButton(employee.id)}
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
                    onClick={() => handleDeleteButton(employee.id)}
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

export default EmployeeTable;
