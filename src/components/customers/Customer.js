import { Link } from "react-router-dom"


export const Customer = ({fullName, id, email}) => {
    
    
    
    return <section className="customer">
    <div>
        <Link to={`/customers/${id}`}>Name: {fullName}</Link>
    </div>
    <div>Email: {email}</div>
    </section>
}