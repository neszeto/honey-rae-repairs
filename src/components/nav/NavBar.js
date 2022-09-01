
import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {
 
    const localHoneyUser = localStorage.getItem("honey_user") //gets "honey_user" out of local storage
    const honeyUserObject = JSON.parse(localHoneyUser) //turns from string into object

    if (honeyUserObject.staff) {
        //return employee navigation
        return <EmployeeNav />
    }
    else {
        //return customer navigation
        return <CustomerNav />
    }

}

