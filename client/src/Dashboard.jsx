import { useParams } from "react-router-dom";

const Dashboard = (props) => {

    const { userType } = useParams();

    return ( 
        <div className="dashboard-container">
            <h1>This is the {props.userType} Dashboard</h1>
        </div>
        

     );
}
 
export default Dashboard;