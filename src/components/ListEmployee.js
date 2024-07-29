import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ListEmployee.css";
import Swal from "sweetalert2";
import axios from "axios";

const ListEmployee = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = () => {
    axios
      .get(`http://localhost:54369/Employee/getAllEmployees`)
      .then((res) => {
        console.log(res.data);
        setEmployees(res.data);
      });
  };

  const deleteEmployee = (employeeId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this employee!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`http://localhost:54369/Employee/deleteEmployee?EmpID=${employeeId}`)
          .then((res) => {
            console.log(res.data);
            Swal.fire("Deleted!", "Your employee has been deleted.", "success");
            getAllEmployees();
          })
          .catch((error) => {
            console.log(error);
            Swal.fire("Error!", "Failed to delete the Employee.", "error");
          });
      }
    });
  };

  // const updateEmployee = (employeeId) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You will not be able to recover this employee!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, update it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axios
  //         .post(`http://localhost:54369/Employee/updateEmployee?employeeID=${employeeId}`)
  //         .then((res) => {
  //           console.log(res.data);
  //           setEmployees(res.data);
  //           Swal.fire("Updatedted!", "Your employee has been updated.", "success");
  //           getAllEmployees();
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           Swal.fire("Error!", "Failed to update the Employee.", "error");
  //         });
  //     }
  //   });
  // };

  return (
    <div className="container">
      <h2 className="text-center L1">List Employees</h2>
      <Link to="/add-employee" className="btn btn-primary mb-2">
        Add Employee
      </Link>

      <table className="table table-bordered table-striped ">
        <thead>
          <th style={{ color: "white" }}>Employee ID</th>
          <th style={{ color: "white" }}>Employee Name</th>
          <th style={{ color: "white" }}>Employee Age</th>
          <th style={{ color: "white" }}>EID</th>
          <th style={{ color: "white" }}>Education Type</th>
          <th style={{ color: "white" }}>Actions</th>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employeeID}>
              <td>{employee.employeeID}</td>
              <td>{employee.name}</td>
              <td>{employee.age}</td>
              <td>{employee.eID}</td>
              <td>{employee.educationType}</td>
              <td>
                <Link
                  className="btn btn-info"
                  to={`/edit-employee/${employee.employeeID}`}
                >
                  Update
                </Link>
                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "4px" }}
                  onClick={() => deleteEmployee(employee.employeeID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployee;
