import { useEffect, useState } from "react"
import { Customer } from "./Customer"
import "./Customers.css"


export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=false`)
            .then(response => response.json())
            .then((customersArray) => {
                setCustomers(customersArray)
            })
        },
        []
    )


    return <article className="customers">
        {
            customers.map(customer=> {
               return <Customer key={customer.id}
               fullName={customer.fullName} 
               id={customer.id} 
               email={customer.email}/>
            })
        }
    </article>
    
}  