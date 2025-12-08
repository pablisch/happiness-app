import { useEffect, useState } from "react";

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
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <p>Loading data...</p>
            )}
            {data && (
                <div style={{ marginTop: "2rem" }}>
                    <h2>Chart from Python</h2>
                    <img src="http://127.0.0.1:8000/chart" alt="Chart" />
                </div>
            )}
        </div>

    );
}

export default App;
