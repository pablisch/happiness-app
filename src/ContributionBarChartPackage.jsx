// ContributionBarChartPackage.jsx
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

// What users see vs what API gets
const yearOptions = [
    { label: "2021", value: "2021" },
    { label: "2022", value: "2022" },
    { label: "2023", value: "2023" },
];

function ContributionBarChartPackage() {
    const [region, setRegion] = useState("Central and Eastern Europe");
    const [year, setYear] = useState(yearOptions[0].value); // "2021"

    return (
        <div style={{ marginTop: "2rem" }}>
            <h2>Chart from Python</h2>

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

            <ContributionBarChartImage region={region} year={year} />
        </div>
    );
}

export default ContributionBarChartPackage;
