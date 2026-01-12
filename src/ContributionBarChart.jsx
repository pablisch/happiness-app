import { useState } from "react";
import ContributionBarChartSelectors from "./ContributionBarChartSelectors";
import ContributionBarChartImage from "./ContributionBarChartImage";

function ContributionBarChart() {
    const [geoArea, setGeoArea] = useState("EU");
    const [year, setYear] = useState("2021");

    return (
        <div style={{ marginTop: "2rem" }}>
            <h2>Happiness Contributors</h2>

            <ContributionBarChartSelectors
                geoArea={geoArea}
                year={year}
                onGeoAreaChange={setGeoArea}
                onYearChange={setYear}
            />

            <ContributionBarChartImage geoArea={geoArea} year={year} />
        </div>
    );
}

export default ContributionBarChart;
