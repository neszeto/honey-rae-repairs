import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export const CustomerDetails = () => {
    const {customerId} = useParams()
    const [customer, setCustomer] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
            .then(response=>response.json())
            .then(
                (data) => {
                    const customerObject = data[0]
                    setCustomer(customerObject)
                }
            )
        },
        [customerId]
    )


    return <section className="customer">
    <header className="customer_header">{customer?.user?.fullName}</header>
    <div>Email: {customer?.user?.email}</div>
    <div>Address: {customer.address}</div>
    <div>Phone Number: {customer.phoneNumber}</div>
</section>
}