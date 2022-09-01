
import { CustomerViews } from "./CustomerViews"
import { EmployeeViews } from "./EmployeeViews"

export const ApplicationViews = () => {
	
    const localHoneyUser = localStorage.getItem("honey_user") //gets "honey_user" out of local storage
    const honeyUserObject = JSON.parse(localHoneyUser) //turns from string into object

    if (honeyUserObject.staff) {
        //return employee views
        return <EmployeeViews />
    }
    else {
        //return customer views
        return <CustomerViews />
    }
}