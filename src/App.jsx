import { useEffect, useState } from "react";
import ContributionChart from "./ContributionChart.jsx";

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/data")
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div style={{ padding: "2rem" }}>
            <h1>React + Python API</h1>
            {data ? (
                <pre>{JSON.stringify(data.slice(0, 2), null, 2)}</pre>
            ) : (
                <p>Loading data...</p>
            )}
            <ContributionChart />
        </div>

    );
}

export default App;
