import "./App.css";
import DepartmentTable from "./components/DepartmentTable";
import EmployeeTable from "./components/EmployeeTable";

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="item">
          <EmployeeTable />
        </div>
        <div className="item">
          <DepartmentTable />
        </div>
      </div>
      <div style={{ height: "200px" }} className="footer"></div>
    </div>
  );
};

export default App;
