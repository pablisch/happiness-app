import { useState } from "react";
import ContributionBarChartSelectors from "./ContributionBarChartSelectors";
import ContributionBarChartImage from "./ContributionBarChartImage";

function ContributionBarChart() {
    const [geoArea, setGeoArea] = useState("France");
    const [year, setYear] = useState("2021");
    const [showEU, setShowEU] = useState(false);

    return (
        <div style={{ marginTop: "2rem" }}>
            <h2>Happiness Contributors</h2>

            <ContributionBarChartSelectors
                geoArea={geoArea}
                year={year}
                showEU={showEU}
                onGeoAreaChange={setGeoArea}
                onYearChange={setYear}
                onShowEUChange={setShowEU}
            />

            <ContributionBarChartImage geoArea={geoArea} year={year} showEU={showEU} />
        </div>
    );
}

export default ContributionBarChart;
