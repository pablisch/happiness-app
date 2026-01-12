import { useEffect, useState } from "react";
import ContributionBarChartSelectors from "./ContributionBarChartSelectors.jsx";
import ContributionBarChart from "./ContributionBarChart.jsx";

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
            <h1>Temp Title</h1>
            {data ? (
                <p>data Loaded.</p>
            ) : (
                <p>Loading data...</p>
            )}
            <ContributionBarChart />
        </div>

    );
}

export default App;
