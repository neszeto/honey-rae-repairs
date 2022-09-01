import { useEffect, useState } from "react"
import { Employee } from "./Employee"
import "./Employees.css"

export const EmployeeList = () => {
 const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=true`) //this url only fetches employees who's isStaff: true
            .then(response => response.json())
            .then((staffArray) => {
                setEmployees(staffArray)

            })
        },
        []
    )

    return <article className="employees">
    {
        employees.map(employee => <Employee key={`employee--${employee.id}`}
            id={employee.id} 
            fullName ={employee.fullName} 
            email= {employee.email}/>)
    }
    </article>



}