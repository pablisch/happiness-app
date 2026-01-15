import { useEffect, useState } from "react";
import ContributionBarChart from "./ContributionBarChart/ContributionBarChart.jsx";
import {SelectorProvider} from "./context/SelectorProvider.jsx";

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/data")
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((err) => console.error(err));
    }, []);

    return (
        <SelectorProvider>
        <div style={{ padding: "2rem" }}>
            <h1>Temp Title</h1>
            {data ? (
                <p>data Loaded.</p>
            ) : (
                <p>Loading data...</p>
            )}
            <ContributionBarChart />
        </div>
        </SelectorProvider>
    );
}

export default App;
