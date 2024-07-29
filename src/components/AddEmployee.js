import React, { useEffect, useState } from "react";
import EmployeeService from "../service/EmployeeService";
import { useHistory, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./AddEmployee.css";
import axios from "axios";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [eid, setEID] = useState("");
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { id } = useParams();

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = "Name is required";
    }
    if (!age.trim()) {
      errors.age = "Age is required";
    }
    if (!eid.trim()) {
      errors.eid = "EID is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const employee = { name, age, eid };
    let formData = new FormData();
    formData.append("name", name);
    formData.append("eID", eid);
    formData.append("age", age);

    if (id) {
      formData.append("employeeID", id);
      let config = {
        method: "post",
        url: `http://localhost:54369/Employee/updateEmployee`,
        data: formData,
      };
      return axios.request(config).then((res) => {
        if (res.data == "True")
          Swal.fire("Updated!", "Your employee has been updated.", "success");
        // getAllEmployees();
      });
    } else {
      let config = {
        method: "post",
        url: "http://localhost:54369/Employee/insertEmployee",
        data: formData,
      };
      return axios.request(config).then((res) => {
        if (res.data == "True")
          Swal.fire("Added!", "Your employee has been Added.", "success");
      });
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:54369/Employee/getEmployeeByID?EmpID=${id}`)
        .then((response) => {
          setName(response.data.name);
          setAge(response.data.age);
          setEID(response.data.eID);
        });
    }
  }, [id]);

  const title = () => {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  };

  return (
    <div>
      <br /> <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {title()}
            <div className="card-body transparent-table">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Name :</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required // Add required attribute here
                  />
                  <div className="invalid-feedback">{errors.name}</div>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Employee Age :</label>
                  <input
                    type="text"
                    placeholder="Enter Employee Age"
                    name="age"
                    className={`form-control ${errors.age ? "is-invalid" : ""}`}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">{errors.age}</div>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Employee Education ID:</label>
                  <input
                    type="text"
                    placeholder="Enter Employee EID"
                    name="eid"
                    className={`form-control ${errors.eid ? "is-invalid" : ""}`}
                    value={eid}
                    onChange={(e) => setEID(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">{errors.eid}</div>
                </div>
                <button
                  className="btn btn-success"
                  onClick={(e) => saveOrUpdateEmployee(e)}
                >
                  Save
                </button>
                <Link
                  to="/"
                  className="btn btn-danger"
                  style={{ marginLeft: "2px" }}
                >
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
