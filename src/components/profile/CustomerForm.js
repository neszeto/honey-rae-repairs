import { useEffect, useState } from "react"


export const CustomerForm = () => {
//set default state
//fetch the customer Object that is logged in, observe initial state
//complete each onChange events
//create a submit profile function
    //fetch specific customer by id and in body, stringify to new profile info that was inputed. use PUT
//invoke it when button clicked

    const [profile, updateProfile] = useState(
        {
            address: "",
            phoneNumber: "",
            userId: 0
        }
    )
    
    const localHoneyUser = localStorage.getItem("honey_user") 
    const honeyUserObject = JSON.parse(localHoneyUser) 

    const [popup, setPopup] = useState("")

    useEffect(() => {
        if (popup !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setPopup(""), 3000); //timer set to 3000milliseconds(3 secs) and then setFunction("") will execute
        }
        }, 
    [popup]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
            .then(response => response.json())
            .then(
                (data) => {
                    const customerObject = data[0]
                    updateProfile(customerObject)
                }
            )
        },
        []
    ) 


    const SubmitProfile = (event) => {
        event.preventDefault()

        fetch(`http://localhost:8088/customers/${profile.id}`, {//unique identifier for customer you want to update
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)

        }) 
        .then(response => response.json())
        .then(
            () => {
                setPopup("Customer profile has been updated")
            }
        )
        
    }



    return (
        <>
        <div className={`${popup.includes("Error") ? "error" : "feedback"} ${popup === "" ? "invisible" : "visible"}`}>{popup}</div>
        <form className="profile">
            <h2 className="profile__title">Update Customer Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.address}
                        onChange={
                            (evt) => {
                                const copy = structuredClone(profile)
                                copy.address = evt.target.value
                                updateProfile(copy)
                                
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="phone_number">Phone Number:</label>
                    <input type="text"
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                const copy = structuredClone(profile)
                                copy.phoneNumber = evt.target.value
                                updateProfile(copy)
                              
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={
                    (clickEvent) => {
                        SubmitProfile(clickEvent)
                    }
                }
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
        </>
    )
}