import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useEffect, useState } from "react";

const PresidentRequests = () => {

    const { id } = useParams();
    const { data: president, isPending, error } = useFetch('http://localhost:3333/presidents/' + id);
    const [presidentFullName,setPresidentFullName] = useState('Error loading user request list ...');
    useEffect(() => {
        if (president){
            setPresidentFullName(`${president.firstName} ${president.lastName}`);
        }
    },[president]);

    return (
        <>
        {error && <h1>Requests for this president where Not Found on the Server</h1> }
        {isPending && <div>Loading ...</div>}
        {president &&
            <h1>This page contains the full request list of {presidentFullName}</h1>
        }
        </>
     );
}
 
export default PresidentRequests;