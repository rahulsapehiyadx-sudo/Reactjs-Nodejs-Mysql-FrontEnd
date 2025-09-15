import { useEffect, useState } from "react";


export default function Profile() {
    const [data, setdata] = useState(null)

    useEffect(() => {
        // fetch protected backend route 
        fetch('http://localhost:3000/api/profile', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}` ,
            },
        })

        .then((res) => res.json())
        .then(setdata);
    }, []);

    return(
        <div className="card">
            <h2>Profile</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}
