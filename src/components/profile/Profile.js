import { CustomerForm } from "./CustomerForm"
import { EmployeeForm } from "./EmployeeForm"


export const Profile = () => {
 
    const localHoneyUser = localStorage.getItem("honey_user") //gets "honey_user" out of local storage
    const honeyUserObject = JSON.parse(localHoneyUser) //turns from string into object

    if (honeyUserObject.staff) {
        //return employee form
        return <EmployeeForm /> 
    }
    else {
        //return customer form
        return <CustomerForm />
    }

}