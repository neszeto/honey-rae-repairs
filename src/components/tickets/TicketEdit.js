import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const TicketEdit = () => {
    //set state to default description and emergency
    //when initial state is observed, change state to current redition of service ticket
        //need to fetch the service ticket being modified 
    //set onChange functions for both desecription and emergency
    //create a function that will be invoked when edit saved
        //function should fetch unique identifier for ticket being worked on
        //it should do a PUT method
        //and stringify the newly updated information
    //invoke this function when Save Edits is clicked
    const {ticketId} = useParams()
    const [ticket, updateTicket] = useState(
        {
            description: "",
            emergency: false
        }
    )
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
            .then(response => response.json())
            .then(
                (ticketObject) => {
                    updateTicket(ticketObject) //already an object so you don't have to index it
                }
            )
        },
        [ticketId]
    )


    const SaveEdit = (event) => {
        event.preventDefault()

        fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })
        .then(response=>response.json())
        .then(
            () => {

            }
        )

    }

    
    
    return (
        <form>
            <h2>Service Ticket</h2>
            <fieldset>
                <div className="description_box">
                    <label htmlFor="description">Description: </label>
                    <textarea className="description_field" name="description" value={ticket.description}
                    onChange = {
                        (evt) => {
                            const copy = structuredClone(ticket)
                            copy.description = evt.target.value
                            updateTicket(copy)
                        }
                    }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="emergency_box">
                    <label htmlFor="emergency">Emergency</label>
                    <input name="emergency" type="checkbox" value={ticket.emergency}
                    onClick = {
                        (evt) => {
                            const copy = structuredClone(ticket)
                            copy.emergency = evt.target.checked
                            updateTicket(copy)
                        }
                    } />
                </div>
            </fieldset>
            <button
            onClick = {
                (clickEvent) => {
                    SaveEdit(clickEvent)
                }
            }>Save Edits</button>
        </form>
    )
  
}