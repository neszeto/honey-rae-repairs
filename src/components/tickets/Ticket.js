import { Link } from "react-router-dom"

export const Ticket = ({ticket, currentUser, employees, getAllTickets}) => {
    
    //find the assigned employee for the current ticket
    let assignedEmployee = null

    if (ticket.employeeTickets.length > 0) {
        const ticketEmployeeRelationship = ticket.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }

    //find the employee profile for the current user
    const userEmployee = employees.find(employee => employee.user.id === currentUser.id)

    //function that determines if current user can close ticket 
    const canClose = () => {
        if (userEmployee?.id === assignedEmployee?.id && ticket.dateCompleted === "") {
            return <button 
            onClick = {
                () => {
                    closeTicket()
                }
            } className="ticket_finish">Finish</button>
        }
        else {
            return ""
        }
    }


    //function that updates tickets with new date completed
    const closeTicket = () => {
        const copy = {
            userId: ticket.userId,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: new Date()
        }


        return fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
        .then(response=>response.json())
        .then(getAllTickets) //this is the same as () => { getALlTickets()}
    }


    //function that shows delete button if customer logged in
    const deleteButton = () => {
        if (!currentUser.staff) {
            return <button
            onClick={
                () => {
                    fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
                        method: "DELETE"
                    })
                    .then(getAllTickets)
                }
            }>Delete</button>
        }
        else {
            return ""
        }
    }

   

    
    const buttonOrNoButton = () => {
        if (currentUser.staff) {
            return <button
            onClick = {
                () => {
                    fetch(`http://localhost:8088/employeeTickets`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(
                            {
                                employeeId: userEmployee.id,
                                serviceTicketId: ticket.id
                            }
                        )
                    })
                    .then(response => response.json())
                    .then(
                        () => {
                            getAllTickets() //rerender all ticket list 
                        }
                    )

                }
            }>Claim</button>
        }
        else {
            return ""
        }
    }
    return <section key={`ticket--${ticket.id}`}className="ticket">
    <header>
        {
            currentUser.staff
            ? <div>Ticket {ticket.id}</div>
            : <Link to={`/ticket/${ticket.id}/edit`}>Ticket {ticket.id}</Link>
        }
    </header>
    <section>{ticket.description}</section>
    <section>Emergency: {ticket.emergency ? "🧨" : "No" }</section>
    <footer className="footer">
        {
            ticket.employeeTickets.length
            ? <div>Currently being worked on by {assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}</div>
            : buttonOrNoButton()
        }
        {
            canClose()
        }
        {
            deleteButton()
        }
    </footer>
    </section>
}