import { useState } from "react";
import ContributionBarChartSelectorsOriginal from "./ContributionBarChartSelectorsOriginal";
import ContributionBarChartImageOriginal from "./ContributionBarChartImageOriginal";

function ContributionBarChartOriginal() {
    const [geoArea, setGeoArea] = useState("EU");
    const [year, setYear] = useState("2021");

    return (
        <div style={{ marginTop: "2rem" }}>
            <h2>Happiness Contributors - ORIGINAL VERSION</h2>

            <ContributionBarChartSelectorsOriginal
                geoArea={geoArea}
                year={year}
                onGeoAreaChange={setGeoArea}
                onYearChange={setYear}
            />

            <ContributionBarChartImageOriginal geoArea={geoArea} year={year} />
        </div>
    );
}

export default ContributionBarChartOriginal;
