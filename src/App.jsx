import ContributionBarChart from "./ContributionBarChart/ContributionBarChart.jsx";
import TimeLineGraph from "./TimeLineGraph/TimeLineGraph.jsx";

import CountrySelector from "./Selectors/CountrySelector.jsx";
import ShowEuCheckbox from "./Selectors/ShowEuCheckbox.jsx";
import YearSelector from "./Selectors/YearSelector.jsx";
import FixedScaleCheckbox from "./Selectors/fixedScaleCheckbox.jsx";

function App() {
    return (
        <div style={{ padding: "2rem" }}>
            <h1>Temp Title</h1>

            {/* Selectors */}
            <div style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
                <CountrySelector />
                <ShowEuCheckbox />
                <YearSelector />
                <FixedScaleCheckbox />
            </div>

            {/* Charts */}
            <ContributionBarChart />
            <TimeLineGraph />
        </div>
    );
}

export default App;
