// ContributionChartComparison.jsx
import { useState } from "react";
import RadioSelector from "./RadioSelector";
import ContributionBarChartImage from "./ContributionBarChartImage";

const regionOptions = [
    "Western Europe",
    "North America and ANZ",
    "Middle East and North Africa",
    "Latin America and Caribbean",
    "Central and Eastern Europe",
    "East Asia",
    "Southeast Asia",
    "Commonwealth of Independent States",
    "Sub-Saharan Africa",
    "South Asia",
].map((r) => ({ label: r, value: r }));

const yearOptions = [
    { label: "2021", value: "2021" },
    { label: "2022", value: "2022" },
    { label: "2023", value: "2023" },
];

function ContributionChartComparison() {
    const [region, setRegion] = useState("Central and Eastern Europe");
    const [year, setYear] = useState(yearOptions[0].value);

    return (
        <div style={{ marginTop: "2rem" }}>
            <h2>Happiness Contributors – Style Comparison</h2>

            <RadioSelector
                name="region"
                title="Select Region:"
                options={regionOptions}
                value={region}
                onChange={setRegion}
            />

            <RadioSelector
                name="year"
                title="Select Year:"
                options={yearOptions}
                value={year}
                onChange={setYear}
            />

            {/* Three charts using same inputs */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    marginTop: "1.5rem",
                }}
            >
                <ContributionBarChartImage
                    title="Original Matplotlib"
                    styleName="original"
                    region={region}
                    year={year}
                />
                <ContributionBarChartImage
                    title="Polished Matplotlib"
                    styleName="polished"
                    region={region}
                    year={year}
                />
                <ContributionBarChartImage
                    title="Seaborn"
                    styleName="seaborn"
                    region={region}
                    year={year}
                />
            </div>
        </div>
    );
}

export default ContributionChartComparison;
