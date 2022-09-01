import { TicketList } from "./TicketList"
import { TicketSearch } from "./TicketSearch"
import { useState } from "react"

export const TicketContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <TicketSearch setterFunction={setSearchTerms}/> 
        <TicketList searchTermsState={searchTerms}/>
    </>
}

//TicketSearch module is able to see everything in <  /> AND it is able to access the parent variables