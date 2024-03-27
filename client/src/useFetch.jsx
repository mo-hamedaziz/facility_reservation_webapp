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
    }, [url, refresh]); // Trigger fetch when 'url' or 'refresh' changes

    return { data, isPending, error };
};
 
export default useFetch;
