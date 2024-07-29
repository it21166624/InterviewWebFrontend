import axios from 'axios';

const API_BASE_URL = 'http://localhost:54369/Employee'; 

export const GetEmployeeDetails = async () => {
    const config = {
        method: 'get',
        url: `http://localhost:54369/Employee/getAllEmployees`,
    };
    return await axios.request(config).then((response) => {
        return response.data;
    }).catch((error) => {
        console.error("There was an error getting the employees!", error);
    });
};

export const GetEmployeeById = async (id) => {
    const config = {
        method: 'get',
        url: `http://localhost:54369/Employee/getEmployee/${id}`,
    };
    return await axios.request(config).then((response) => {
        return response.data;
    }).catch((error) => {
        console.error(`There was an error getting the employee with id ${id}!`, error);
    });
};

export const UpdateEmployee = async (employee) => {
    const config = {
        method: 'put',
        url: `http://localhost:54369/Employee/updateEmployee`,
        data: employee,
    };
    return await axios.request(config).then((response) => {
        return response.data;
    }).catch((error) => {
        console.error("There was an error updating the employee!", error);
    });
};

export const DeleteEmployee = async (employeeID) => {
    const config = {
        method: 'post',
        url: `http://localhost:54369/Employee/deleteEmployee?EmpID=${employeeID}`,
    };
    return await axios.request(config).then((response) => {
        return response.data;
    }).catch((error) => {
        console.error(`There was an error deleting the employee with id ${employeeID}!`, error);
    });
};

export default {
    GetEmployeeDetails,
    GetEmployeeById,
    UpdateEmployee,
    DeleteEmployee,
};
