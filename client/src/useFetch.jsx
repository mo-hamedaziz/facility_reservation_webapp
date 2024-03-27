import { useState, useEffect } from "react";

const useFetch = (url, refresh) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending]=useState(true);
    const [error, setError]=useState(null);

    const fetchData = () => {
        setIsPending(true);
        setError(null);

        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw Error("Could not fetch the data for that resource");
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsPending(false);
            })
            .catch(err => {
                setError(err.message);
                setIsPending(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [url, refresh]); // Trigger fetch when 'refresh' changes

    const refetch = () => {
        fetchData(); // Call fetchData to trigger a new fetch
    };

    return { data, isPending, error, refetch };
};
 
export default useFetch;
