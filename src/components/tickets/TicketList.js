import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Ticket } from "./Ticket"
import "./tickets.css"


export const TicketList = ({ searchTermsState }) => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])

    const [employees, setEmployees] = useState([])

    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)

    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user") //gets "honey_user" out of local storage
    const honeyUserObject = JSON.parse(localHoneyUser) //turns from string into object

    useEffect(
        () => {
            const searchedTickets = tickets.filter(ticket => {
                return ticket.description.toLowerCase().startsWith(searchTermsState.toLowerCase()) //both are set to lowercase so it will always match 
            })
            setFiltered(searchedTickets)
        },
        [searchTermsState]

    )
    
    
    const getAllTickets = () => {
        fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets`)
            .then(response => response.json())
            .then((ticketArray) => {
            setTickets(ticketArray) 
        })
    }
    

    useEffect(
        () => {
            getAllTickets()

            fetch(`http://localhost:8088/employees?_expand=user`)
            .then(response => response.json())
            .then(
                (employeeArray) => {
                    setEmployees(employeeArray)
                })
        
    },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (honeyUserObject.staff) {
                    //for employees
                    setFiltered(tickets) 
            }
            else{
                    //for customers
                    const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                    setFiltered(myTickets) //this is now stored in variable filteredTickets
            }

        },
        [tickets] //state we want to observe
    )

    useEffect(
        () => {
            if (emergency) { //emergency is true
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets) //this is now stored in variable filteredTickets
            }
            else { //emergency is false
                setFiltered(tickets)
            }
        },
        [emergency] //this is the state you want to observe (emergency is true or false)
    )

    useEffect(
        () => {
            if (openOnly) { //if true
                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
            })
            setFiltered(openTicketArray)
            }
            else { //if false, show all tickets for user
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                    setFiltered(myTickets)
            }
        },
        [openOnly] //state we want to observe
    )

    return <>
    {
        honeyUserObject.staff 
        ? <><button onClick = {() => setEmergency(true)}>Emergency Only</button>
        <button onClick = {() => setEmergency(false)}>Show All</button>
        </>
        : <><button onClick = {() => navigate("/ticket/create")}>Create Ticket</button>
        <button onClick = {() => updateOpenOnly(true)}>Open Tickets</button>
        <button onClick = {() => updateOpenOnly(false)}>All My Tickets</button></>
    }
        <h2>List of Tickets</h2>
        <article className="tickets">
            {
                filteredTickets.map(
                    (ticket) => {
                        return <Ticket ticket={ticket} 
                        currentUser={honeyUserObject} 
                        employees={employees} 
                        getAllTickets={getAllTickets}/>
                    }
                )
            }
        </article>
        </> //JSX syntax
}